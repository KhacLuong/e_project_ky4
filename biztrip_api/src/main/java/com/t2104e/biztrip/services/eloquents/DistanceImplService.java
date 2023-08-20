package com.t2104e.biztrip.services.eloquents;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.t2104e.biztrip.command.DistanceRequest;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.DistanceEntity;
import com.t2104e.biztrip.entities.DropOffPointEntity;
import com.t2104e.biztrip.entities.ScheduleEntity;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.IDistanceService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;
import com.google.gson.Gson;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class DistanceImplService implements IDistanceService {
    @Autowired
    CoachRepository coachRepo;
    @Autowired
    ScheduleRepository scheduleRepo;
    @Autowired
    DistanceRepository distanceRepo;
    @Autowired
    PickUpRepository pickUpRepo;
    @Autowired
    DropOffRepository dropOffRepo;

    // Khởi tạo đối tượng ObjectMapper
    ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private ValidationHandle validationHandle;

    @Override
    public ResponseDTO<?> getListDistanceByCoachId(long coachId, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<DistanceDto> distanceDtoList = distanceRepo.findByCoachIdAndSearchByKeyword(coachId, Objects.requireNonNullElse(keyword, ""), sort);
//        if (!distanceDtoList.isEmpty()) {
        return ResponseService.ok(distanceDtoList, "Lấy danh sách quãng đường thành công.", sortField, sortDir);
//        } else {
//            return ResponseService.noContent("Không có dữ liệu.");
//        }
    }

    @Override
    public ResponseDTO<?> save(long coachId, DistanceRequest request, BindingResult result) {
        DistanceEntity model;

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!coachRepo.existsById(coachId)){
            return ResponseService.badRequest("Không tìm thấy xe có id = " + coachId);
        }
        if (!scheduleRepo.existsById(request.getScheduleId())){
            return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + request.getScheduleId());
        }

        long id = request.getId();
        model =  new DistanceEntity();
        if (id == 0) {
            model.setCoachId(coachId);
            model.setCreatedAt(new Date());

        } else {
            model = distanceRepo.findById(id).orElse(null);
            if (model == null) {
                return ResponseService.badRequest("Không tìm thấy quãng đường có id = " + id);
            }

        }
        model.setScheduleId(request.getScheduleId());


        model.setUpdatedAt(new Date());
        var data = distanceRepo.save(model);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Transactional
    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<DistanceEntity> optional = distanceRepo.findById(id);
        if (optional.isPresent()) {
            distanceRepo.deleteById(id);
            pickUpRepo.deleteAllByDistanceId(id);
            dropOffRepo.deleteAllByDistanceId(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy quãng đường có id = " + id);

    }

    @Override
    public ResponseDTO<?> deleteByCoachId(long coachId) {
        List<DistanceEntity> distanceEntities = distanceRepo.findAllByCoachId(coachId);
        if (!distanceEntities.isEmpty()) {
            for (DistanceEntity distance: distanceEntities) {
                if (distance!=null){
                    distanceRepo.deleteById(distance.getId());
                    pickUpRepo.deleteAllByDistanceId(distance.getId());
                    dropOffRepo.deleteAllByDistanceId(distance.getId());
                }
            }

            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không timg thấy xe có id = " + coachId);
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        Optional<DistanceDetailDto> optional = distanceRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy lộ trình id = " + id);
    }

    @Override
    public ResponseDTO<?> getListDetailByCoachId(long coachId) {
        List<DistanceDetailDto> models = distanceRepo.findDetailByCoachId(coachId);

        return ResponseService.ok(models, "Lấy danh sách quãng đường thành công.");
    }

    @Override
    public ResponseDTO<?> getListDetailScheduleId(long scheduleId) {
        List<DistanceDetailDto> models = distanceRepo.getDetailByScheduleId(scheduleId);
        return ResponseService.ok(models, "Lấy danh sách quãng đường thành công.");
    }


    @Override
    public ResponseDTO<?> getListDtoCoachId(long coachId) {
        List<DistanceDto> models = distanceRepo.findDtoByCoachId(coachId);
        for (DistanceDto detailDto: models) {
            List<PickUpDto>  pickUpDtoList = pickUpRepo.findAllByDistanceId(detailDto.getId());
            List<DropOffDto> dropOffDtoList = dropOffRepo.findAllByDistanceId(detailDto.getId());
            detailDto.setPickUpDtoList(pickUpDtoList);
            detailDto.setDropOffDtoList(dropOffDtoList);
        }
        return ResponseService.ok(models, "Lấy danh sách quãng đường thành công.");

    }

    @Override
    public ResponseDTO<?> getCountOfDistanceInDawn(long scheduleId) {
        int count = distanceRepo.countDistanceByTimeDawn(scheduleId);
        return ResponseService.ok(count, "Lấy số lượng thành công.");
    }

    @Override
    public ResponseDTO<?> getCountOfDistanceInMorning(long scheduleId)  {
        int count = distanceRepo.countDistanceByTimeMorning(scheduleId);
        return ResponseService.ok(count, "Lấy số lượng thành công.");
    }

    @Override
    public ResponseDTO<?> getCountOfDistanceInAfternoon(long scheduleId) {
        int count = distanceRepo.countDistanceByTimeAfternoon(scheduleId) ;
        return ResponseService.ok(count, "Lấy số lượng thành công.");
    }

    @Override
    public ResponseDTO<?> getCountOfDistanceInEvening(long scheduleId) {
        int count = distanceRepo.countDistanceByTimeEvening(scheduleId) ;
        return ResponseService.ok(count, "Lấy số lượng thành công.");
    }
}
