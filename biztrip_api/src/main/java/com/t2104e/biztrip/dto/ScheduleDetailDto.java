package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.LocationEntity;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleDetailDto {
    private long id;
    private String imagePath;
    private String scheduleCode;
    private String status;
    private boolean isPopular;
    private LocationEntity departure;
    private LocationEntity destination;
    private Date createdAt;
    private Date updatedAt;
}
