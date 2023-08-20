package com.t2104e.biztrip.dto;

import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
public class DistanceDto {
    private long id;
    private String scheduleDeparture;
    private String scheduleDestination;
    private int timeDifference;

    @DateTimeFormat(pattern = "H:m:s")
    private Time startTime;

    @DateTimeFormat(pattern = "H:m:s")
    private Time endTime;


    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    private List<PickUpDto> pickUpDtoList;
    private List<DropOffDto> dropOffDtoList;

    public DistanceDto(long id, String scheduleDeparture, String scheduleDestination, int timeDifference, Time startTime, Time endTime, Date createdAt, Date updatedAt) {
        this.id = id;
        this.scheduleDeparture = scheduleDeparture;
        this.scheduleDestination = scheduleDestination;
        this.timeDifference = timeDifference;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
