package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class DistanceDetailDto {
    private long id;
    private CoachEntity coach;
    private ScheduleEntity schedule;
    private int timeDifference;

    @DateTimeFormat(pattern = "H:m:s")
    private Time startTime;

    @DateTimeFormat(pattern = "H:m:s")
    private Time endTime;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
