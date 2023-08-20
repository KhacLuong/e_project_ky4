package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.DistanceEntity;
import com.t2104e.biztrip.entities.EmployeeDistanceStatus;
import com.t2104e.biztrip.entities.EmployeeInfoEntity;
import lombok.*;

import java.util.Date;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DivisionDto {
    private long id;
    private EmployeeInfoEntity employee;
    private DistanceDetailDto distance;
    private EmployeeDistanceStatus status;
    private Date date;
    private String note;
    private Date timeToAdd;
    private Date timeToExpire;
}
