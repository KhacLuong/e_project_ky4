package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.DistanceRequest;
import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.DistanceEntity;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface IDistanceService {

    ResponseDTO<?> getListDistanceByCoachId(long coachId, String sortField, String sortDir, String keyword);

    ResponseDTO<?> save(long coachId, DistanceRequest request, BindingResult result);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> deleteByCoachId(long coachId);

    ResponseDTO<?> getDetail(long id);

    ResponseDTO<?> getListDetailByCoachId(long coachId);

    ResponseDTO<?> getListDetailScheduleId(long scheduleId);

    ResponseDTO<?> getListDtoCoachId(long coachId);

    ResponseDTO<?> getCountOfDistanceInDawn(long scheduleId);

    ResponseDTO<?> getCountOfDistanceInMorning(long scheduleId);

    ResponseDTO<?> getCountOfDistanceInAfternoon(long scheduleId);

    ResponseDTO<?> getCountOfDistanceInEvening(long scheduleId);
}
