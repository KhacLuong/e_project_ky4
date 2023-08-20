package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.EmployeeDistanceStatus;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DivisionRequest {
    private long id;
    private long employeeInfoId;
    private long distanceId;
    private EmployeeDistanceStatus status;
    private Date date;
    private String note;
    private Date timeToAdd;
    private Date timeToExpire;
}
