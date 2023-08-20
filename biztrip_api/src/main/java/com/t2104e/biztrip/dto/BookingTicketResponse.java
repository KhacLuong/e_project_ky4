package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.BookingTicketDetailEntity;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.SeatEntity;
import com.t2104e.biztrip.entities.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.util.Date;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingTicketResponse {
    private long id;
    private double price;
    private Date date;
    private String reservationCode;
    private DistanceDto distance;
    private PickUpDto pickUp;
    private DropOffDto dropOff;
    private long userId;
    private BookingTicketCoachDto coach;
    private State state;
    private Boolean helpBooking;
    private String passengerName;
    private String passengerPhoneNumber;
    private String passengerEmail;
    private Date timeToAdd;
    private Date timeToExpire;
    private Set<BookingTicketDetailEntity> bookingTicketDetails;
    private Set<SeatEntity> seats;
}
