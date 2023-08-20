package com.t2104e.biztrip.dto;

import lombok.*;

import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
    private long id;
    private UserDto user;
    private int generalRating;
    private String comment;
    private Set<ReviewThumbnailDto> reviewThumbnails;
    private long bookingTicketId;
    private Date timeToAdd;
    private Date timeToExpire;
}
