package com.t2104e.biztrip.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingTicketDetailRequest {
    private long id;
    private long seatId;
}
