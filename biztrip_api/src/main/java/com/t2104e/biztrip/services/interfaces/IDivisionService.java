package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.DivisionRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.EmployeeDistanceEntity;
import com.t2104e.biztrip.entities.EmployeeDistanceStatus;

import java.text.ParseException;
import java.util.Date;

public interface IDivisionService {
    ResponseDTO<?>  getListByParams(long scheduleId, String date, int pageNumber, int perPage) throws ParseException;

    ResponseDTO<?> createDivision(DivisionRequest divisionRequest);
    ResponseDTO<?> updateDivision(long id, long employeeInfoId, EmployeeDistanceStatus status);
}
