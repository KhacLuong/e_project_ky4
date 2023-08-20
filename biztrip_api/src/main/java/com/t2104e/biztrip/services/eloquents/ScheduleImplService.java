package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.entities.DistanceEntity;
import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.entities.ScheduleEntity;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;


@Service
@Transactional
public class ScheduleImplService implements IScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepo;

    @Autowired
    private LocationImpIService locationImpIService;

    @Autowired
    private DistanceRepository distanceRepo;
    @Autowired
    private PickUpRepository pickUpRepo;

    @Autowired
    private DropOffRepository dropOffRepo;

    @Autowired
    protected ModelMapper modelMapper;
    @Autowired
    private LocationRepository locationRepository;
    @Override
    public ResponseDTO<?> getListSchedules(int pageNumber, int perPage, String sortField, String sortDir) {
        List<ScheduleEntity> scheduleEntityList = scheduleRepo.findAll();
        List<ScheduleDetailDto> scheduleDetailDtoList = new ArrayList<>();
        for (ScheduleEntity schedule: scheduleEntityList) {
            ScheduleDetailDto scheduleDetailDto = new ScheduleDetailDto();
            scheduleDetailDto.setPopular(schedule.isPopular());
            scheduleDetailDto.setStatus(schedule.getStatus());
            scheduleDetailDto.setId(schedule.getId());
            scheduleDetailDto.setImagePath(schedule.getImagePath());
            scheduleDetailDto.setScheduleCode(schedule.getScheduleCode());
            scheduleDetailDto.setCreatedAt(schedule.getCreatedAt());
            scheduleDetailDto.setUpdatedAt(schedule.getUpdatedAt());
            Optional<LocationEntity> departure = locationRepository.findById(schedule.getDepartureId());
            departure.ifPresent(scheduleDetailDto::setDeparture);
            Optional<LocationEntity> destination = locationRepository.findById(schedule.getDestinationId());
            destination.ifPresent(scheduleDetailDto::setDestination);

            scheduleDetailDtoList.add(scheduleDetailDto);
        }
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);

        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), scheduleDetailDtoList.size());

        Page<ScheduleDetailDto> page = new PageImpl<>(scheduleDetailDtoList.subList(start, end), pageable, scheduleDetailDtoList.size());

        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "lấy danh sách tuyến đường thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getScheduleById(long id) {
        Optional<ScheduleEntity> optional = scheduleRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }

    @Override
    public ResponseDTO<?> getScheduleByDepartureAndDestination(long departureId, long destinationId) {
        Optional<ScheduleEntity> optional = scheduleRepo.getScheduleEntityByDepartureIdAndDestinationId(departureId,destinationId);
        if (optional.isPresent()) {
            ScheduleEntity schedule = optional.get();
            ScheduleDetailDto scheduleDetailDto = new ScheduleDetailDto();
            scheduleDetailDto.setId(schedule.getId());
            scheduleDetailDto.setImagePath(schedule.getImagePath());
            scheduleDetailDto.setScheduleCode(schedule.getScheduleCode());
            scheduleDetailDto.setStatus(schedule.getStatus());
            scheduleDetailDto.setPopular(schedule.isPopular());
            Optional<LocationEntity> departure = locationRepository.findById(schedule.getDepartureId());
            departure.ifPresent(scheduleDetailDto::setDeparture);
            Optional<LocationEntity> destination = locationRepository.findById(schedule.getDestinationId());
            destination.ifPresent(scheduleDetailDto::setDestination);
            return ResponseService.ok(scheduleDetailDto, "lấy dữ liệu thành công");
        }
        return ResponseService.notFound("Không tim thấy lộ trình");
    }

    @Override
    public ResponseDTO<?> getScheduleByCode(String code) {
        Optional<ScheduleEntity> optional = scheduleRepo.findScheduleEntitiesByScheduleCode(code);
        if (optional.isPresent()) {
            ScheduleEntity schedule = optional.get();
            ScheduleDetailDto scheduleDetailDto = new ScheduleDetailDto();
            scheduleDetailDto.setId(schedule.getId());
            scheduleDetailDto.setImagePath(schedule.getImagePath());
            scheduleDetailDto.setScheduleCode(schedule.getScheduleCode());
            scheduleDetailDto.setStatus(schedule.getStatus());
            scheduleDetailDto.setPopular(schedule.isPopular());
            Optional<LocationEntity> departure = locationRepository.findById(schedule.getDepartureId());
            departure.ifPresent(scheduleDetailDto::setDeparture);
            Optional<LocationEntity> destination = locationRepository.findById(schedule.getDestinationId());
            destination.ifPresent(scheduleDetailDto::setDestination);
            return ResponseService.ok(scheduleDetailDto, "lấy dữ liệu thành công");
        }
        return ResponseService.notFound("Không tim thấy lộ trình có code = " + code);
    }

    @Override
    public ResponseDTO<?> getSchedulePopular() {
        List<ScheduleEntity> scheduleEntityList = scheduleRepo.findScheduleEntitiesByPopularIsTrue();
        List<ScheduleDetailDto> scheduleDetailDtoList = new ArrayList<>();
        for (ScheduleEntity schedule: scheduleEntityList) {
            ScheduleDetailDto scheduleDetailDto = new ScheduleDetailDto();
            scheduleDetailDto.setId(schedule.getId());
            scheduleDetailDto.setImagePath(schedule.getImagePath());
            scheduleDetailDto.setScheduleCode(schedule.getScheduleCode());
            scheduleDetailDto.setStatus(schedule.getStatus());
            scheduleDetailDto.setPopular(schedule.isPopular());
            Optional<LocationEntity> departure = locationRepository.findById(schedule.getDepartureId());
            departure.ifPresent(scheduleDetailDto::setDeparture);
            Optional<LocationEntity> destination = locationRepository.findById(schedule.getDestinationId());
            destination.ifPresent(scheduleDetailDto::setDestination);

            scheduleDetailDtoList.add(scheduleDetailDto);
        }
        return ResponseService.ok(scheduleDetailDtoList, "lấy dữ liệu thành công");
    }

    @Override
    public ResponseDTO<?> save(ScheduleRequest request, BindingResult result) {
        ScheduleEntity schedule = new ScheduleEntity();
        if (locationImpIService.checkExistLocationById(request.getDepartureId())) {
            return ResponseService.badRequest("Không tìm thấy điểm xuất phát  có id = " + request.getDepartureId());
        }
        if (locationImpIService.checkExistLocationById(request.getDestinationId())) {
            return ResponseService.badRequest("Không tìm thấy điểm kết thúc có id = " + request.getDestinationId());
        }
        Optional<ScheduleEntity> optional = scheduleRepo.findScheduleEntitiesByDepartureIdAndDestinationIdAndIdNot(request.getDepartureId(), request.getDestinationId(), request.getId());
        if (optional.isPresent()) {
            return ResponseService.badRequest("Đã tồn tại lộ trình");
        }
        long id = request.getId();
        if (id == 0) {
            schedule.setScheduleCode(request.getScheduleCode());
            schedule.setImagePath(request.getImagePath());
            schedule.setDepartureId(request.getDepartureId());
            schedule.setDestinationId(request.getDestinationId());
            schedule.setStatus(request.getStatus());
            schedule.setPopular(request.isPopular());
            schedule.setCreatedAt(new Date());
            schedule.setUpdatedAt(new Date());
        } else {
            schedule = findScheduleById(id);
            if (schedule == null) {
                return ResponseService.badRequest("Không tìm thấy lộ trình có id = " + id);
            }
            schedule.setImagePath(request.getImagePath());
            schedule.setDepartureId(request.getDepartureId());
            schedule.setDestinationId(request.getDestinationId());
            schedule.setStatus(request.getStatus());
            schedule.setPopular(request.isPopular());
            schedule.setUpdatedAt(new Date());
        }
        var data = scheduleRepo.save(schedule);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Override
    public ScheduleEntity findScheduleById(long id) {
        return scheduleRepo.findById(id).orElse(null);
    }

    @Transactional
    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<ScheduleEntity> optional = scheduleRepo.findById(id);
        if (optional.isPresent()) {
            scheduleRepo.deleteById(id);
            List<DistanceEntity> distances = distanceRepo.findAllByScheduleId(id);
            if (distances != null) {
                for (DistanceEntity distance : distances) {
                    distanceRepo.deleteById(distance.getId());
                    pickUpRepo.deleteAllByDistanceId(distance.getId());
                    dropOffRepo.deleteAllByDistanceId(distance.getId());
                }
            }

            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tim thấy lộ trình có id = " + id);
    }

    private ScheduleEntity convertDtoToEntity(ScheduleRequest scheduleDto) {
        Converter<String, Date> stringToDateConverter = context -> {
            String dateString = context.getSource();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                return dateFormat.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }
        };
        modelMapper.addConverter(stringToDateConverter);

        return modelMapper.map(scheduleDto, ScheduleEntity.class);
    }
}
