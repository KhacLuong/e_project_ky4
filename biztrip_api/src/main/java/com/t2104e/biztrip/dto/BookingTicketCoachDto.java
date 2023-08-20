package com.t2104e.biztrip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BookingTicketCoachDto {
    private long id;
    private String name;
    private String plateNumber;
    private String description;
}
