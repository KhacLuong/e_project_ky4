package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.DivisionRequest;
import com.t2104e.biztrip.dto.DistanceDetailDto;
import com.t2104e.biztrip.dto.DivisionDto;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.*;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.IDivisionService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class DivisionImplService implements IDivisionService {
    @Autowired
    private DivisionRepository divisionRepository;
    @Autowired
    private EmployeeInfoRepository employeeInfoRepository;
    @Autowired
    private DistanceRepository distanceRepository;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private CoachRepository coachRepository;

    private List<DivisionDto> handleGetListDivision(long scheduleId, String date) throws ParseException {
        List<DivisionDto> divisionDtoList = new ArrayList<>();
        List<DistanceEntity> distanceEntityList = distanceRepository.findAllByScheduleId(scheduleId);
        for (DistanceEntity distance : distanceEntityList) {
            DivisionDto divisionDto = new DivisionDto();
            Optional<EmployeeDistanceEntity> optional = divisionRepository.findEmployeeDistanceByDistanceIdAndDate(distance.getId(), Helper.convertStringToDate(date));
            DistanceDetailDto distanceDetailDto = new DistanceDetailDto();
            distanceDetailDto.setId(distance.getId());
            Optional<CoachEntity> coachEntity = coachRepository.findById(distance.getCoachId());
            coachEntity.ifPresent(distanceDetailDto::setCoach);
            Optional<ScheduleEntity> scheduleEntity = scheduleRepository.findById(distance.getScheduleId());
            scheduleEntity.ifPresent(distanceDetailDto::setSchedule);
            distanceDetailDto.setTimeDifference(distance.getTimeDifference());
            distanceDetailDto.setStartTime(distance.getStartTime());
            distanceDetailDto.setEndTime(distance.getEndTime());
            distanceDetailDto.setCreatedAt(distance.getCreatedAt());
            distanceDetailDto.setUpdatedAt(distance.getUpdatedAt());

            optional.ifPresentOrElse(employeeDistance -> {
                        divisionDto.setId(employeeDistance.getId());
                        Optional<EmployeeInfoEntity> employeeInfo = employeeInfoRepository.findById(employeeDistance.getEmployeeInfoId());
                        employeeInfo.ifPresent(divisionDto::setEmployee);
                        divisionDto.setNote(employeeDistance.getNote());
                        divisionDto.setDate(employeeDistance.getDate());
                        divisionDto.setDistance(distanceDetailDto);
                        divisionDto.setStatus(employeeDistance.getStatus());
                    },
                    () -> {
                        divisionDto.setDistance(distanceDetailDto);
                        try {
                            divisionDto.setDate(Helper.convertStringToDate(date));
                        } catch (ParseException e) {
                            throw new RuntimeException(e);
                        }
                        divisionDto.setStatus(EmployeeDistanceStatus.Pending);
                    });
            divisionDtoList.add(divisionDto);
        }
        return divisionDtoList;
    }

    @Override
    public ResponseDTO<?> getListByParams(long scheduleId, String date, int pageNumber, int perPage) throws ParseException {
        List<DivisionDto> divisionDtoList = new ArrayList<>();
        if (scheduleId == 0) {
            List<ScheduleEntity> scheduleEntityList = scheduleRepository.findAll();
            for (ScheduleEntity schedule : scheduleEntityList) {
                divisionDtoList = handleGetListDivision(schedule.getId(), date);
            }
        } else {
            divisionDtoList = handleGetListDivision(scheduleId, date);
        }
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage);
        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), divisionDtoList.size());
        Page<DivisionDto> page = new PageImpl<>(divisionDtoList.subList(start, end), pageable, divisionDtoList.size());
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(divisionDtoList, "Lấy danh sách phân công thành công", pageNumber, perPage, totalItems, totalPages);
    }

    @Override
    public ResponseDTO<?> createDivision(DivisionRequest divisionRequest) {
        EmployeeDistanceEntity employeeDistanceEntity = new EmployeeDistanceEntity();
        employeeDistanceEntity.setCreatedAt(new Date());
        employeeDistanceEntity.setUpdatedAt(new Date());

        employeeDistanceEntity.setEmployeeInfoId(divisionRequest.getEmployeeInfoId());
        employeeDistanceEntity.setDistanceId(divisionRequest.getDistanceId());
        employeeDistanceEntity.setStatus(EmployeeDistanceStatus.Waiting);
        employeeDistanceEntity.setDate(divisionRequest.getDate());
        employeeDistanceEntity.setNote(divisionRequest.getNote());
        var data = divisionRepository.save(employeeDistanceEntity);
        return ResponseService.created(data, "Cập nhật thành công");
    }

    @Override
    public ResponseDTO<?> updateDivision(long id, long employeeInfoId, EmployeeDistanceStatus status) {
        Optional<EmployeeDistanceEntity> optional = divisionRepository.findById(id);
        if (optional.isPresent()) {
            optional.get().setStatus(status);
            optional.get().setEmployeeInfoId(employeeInfoId != 0 ? employeeInfoId : optional.get().getEmployeeInfoId());
            optional.get().setUpdatedAt(new Date());
            var data = divisionRepository.save(optional.get());
            return ResponseService.created(data, "Cập nhật thành công");

        }
        return ResponseService.noContent("Không có dữ liệu.");
    }
}
