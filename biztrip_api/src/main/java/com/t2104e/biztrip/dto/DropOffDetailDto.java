package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.DistanceEntity;
import com.t2104e.biztrip.entities.LocationEntity;
import com.t2104e.biztrip.entities.ScheduleEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@NoArgsConstructor
@Getter
@Setter
public class DropOffDetailDto {

    private long id;

    private DistanceEntity distance;

    private LocationEntity location;

    private String  time;


    private String status;

    private boolean isDefault;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public DropOffDetailDto(long id, DistanceEntity distance, LocationEntity location, LocalTime time, int day, int date, String status, Date createdAt, Date updatedAt) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        this.id = id;
        this.distance = distance;
        this.location = location;
        this.time = time.format(formatter);
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
