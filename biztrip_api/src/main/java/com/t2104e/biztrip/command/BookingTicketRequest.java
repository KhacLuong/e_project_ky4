package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.State;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
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
public class BookingTicketRequest {
    private double price;
    private Date date;
    private long distanceId;
    private long dropOffPointId;
    private long pickUpPointId;
    private long userId;
    private long coachId;
    private State state;
    private Boolean helpBooking;
    private String passengerName;
    private String passengerPhoneNumber;
    private String passengerEmail;
    private Date timeToAdd;
    private Date timeToExpire;
    private Time startTimeOfDistance;
    private Time endTimeOfDistance;
    private Set<BookingTicketDetailRequest> bookingTicketDetails;
}
