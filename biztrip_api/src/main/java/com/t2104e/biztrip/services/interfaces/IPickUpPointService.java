package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import jakarta.validation.constraints.NotNull;
import org.springframework.validation.BindingResult;

import java.util.List;

public interface IPickUpPointService {
    ResponseDTO<?> getListPickUpPointByDistanceId(long distanceId, String sortField, String sortDir, String keyword);


    ResponseDTO<?> save(long distanceId,PickUpRequest request, BindingResult result);

    ResponseDTO<?> delete(long id);
    ResponseDTO<?> deleteByDistanceId(long distanceId);

    ResponseDTO<?> getDetail(long id);
    public ResponseDTO<?> saveList(@NotNull long distanceId, @NotNull List<PickUpRequest> pickUpRequestList,BindingResult result);

}
