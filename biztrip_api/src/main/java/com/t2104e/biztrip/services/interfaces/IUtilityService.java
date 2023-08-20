package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.UtilityRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.UtilityEntity;

public interface IUtilityService {
    public ResponseDTO<?> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getOneUtilityById(long id);
    public  ResponseDTO<?> deleteUtility(long id);
    public  ResponseDTO<?> createUtility(UtilityEntity utility);
    public  ResponseDTO<?> updateUtility(UtilityRequest utilityRequest);
}
