package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.SeatEntity;
import com.t2104e.biztrip.entities.ThumbnailEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.List;
import java.util.Set;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CoachDetailDto {

    private long id;

    private String name;

    private String imagePath;

    private String plateNumber;

    private long totalSeats;

    private  double priceFrom;

    private String description;

    private String status;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    private Set<UtilityEntity> utilities;
    private Set<SeatEntity> seats;
    private Set<ThumbnailEntity> thumbnails;
    private List<DistanceDto> distanceDtos;

    public CoachDetailDto(long id, String name, String imagePath, String plateNumber, long totalSeats, double priceFrom, String description, String status, Date createdAt, Date updatedAt) {
        this.id = id;
        this.name = name;
        this.imagePath = imagePath;
        this.plateNumber = plateNumber;
        this.totalSeats = totalSeats;
        this.priceFrom = priceFrom;
        this.description = description;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

}
