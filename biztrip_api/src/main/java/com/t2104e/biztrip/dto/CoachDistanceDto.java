package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.util.List;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CoachDistanceDto {
    private long distanceId;
    private long coachId;
    private int timeDifference;
    @DateTimeFormat(pattern = "H:m:s")
    private Time startTimeOfDistance;
    @DateTimeFormat(pattern = "H:m:s")
    private Time endTimeOfDistance;
    private PickUpDto defaultPickUp;
    private DropOffDto defaultDropOff;
    private String name;
    private String imagePath;
    private String plateNumber;
    private long totalSeats;
    private double priceFrom;
    private String description;
    private String status;
    private long availableSeat;
    private Set<SeatDto> seats;
    private Set<UtilityEntity> utilities;
    private Set<ThumbnailDto> thumbnails;
    private Set<PickUpDto> pickUpDtoList;
    private Set<DropOffDto> dropOffDtoList;
    private Set<ReviewDto> listReview;
    private Double avgOfSafeRating;
    private Double avgOfGeneralRating;
    private Double avgOfComfortableRating;
    private Double avgOfEmployeeAttitudeRating;
    private Double avgOfFullInformationRating;
    private Double avgOfServiceQualityRating;
    private Double avgOfVerifiedInformationRating;
    private int countOfReviewHaveImage;
    private int countOfReviewHaveComment;

}
