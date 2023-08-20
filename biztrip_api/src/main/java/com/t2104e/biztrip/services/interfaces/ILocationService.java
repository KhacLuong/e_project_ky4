package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.LocationRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.LocationEntity;
import org.springframework.validation.BindingResult;

public interface ILocationService {

    ResponseDTO<?> getListLocations(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    ResponseDTO<?> getAllLocations(String sortField, String sortDir, String keyword);
    ResponseDTO<?> getLocationByParentId(long parentId, String keyword);
    ResponseDTO<?> getLocationById(long id);

    ResponseDTO<?> delete(long id);

    ResponseDTO<?> save(LocationRequest location, BindingResult result);
    boolean checkExistLocationById(long id);

    boolean checkExistName(String name);
    boolean checkExistByAddress(String address);
}
