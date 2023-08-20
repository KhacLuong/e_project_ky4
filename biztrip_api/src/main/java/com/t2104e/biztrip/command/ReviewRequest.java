package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.ReviewThumbnailEntity;
import lombok.*;

import java.util.Set;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewRequest {
    private long id;
    private long userId;
    private long coachId;
    private long bookingTicketId;
    private int safeRating;
    private int fullInformationRating;
    private int verifiedInformationRating;
    private int comfortableRating;
    private int serviceQualityRating;
    private int employeeAttitudeRating;
    private int generalRating;
    private String comment;
    private Set<ReviewThumbnailRequest> reviewThumbnails;
}
