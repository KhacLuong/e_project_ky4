package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.PriceTicketEntity;
import com.t2104e.biztrip.entities.TypeRow;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SeatDto {
    private long id;
    private String seatCode;
    private String type;
    private long position;
    private PriceTicketEntity priceTicketId;
    private String state;
    private TypeRow typeRow;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @DateTimeFormat(pattern = "H:m:s")
    private Time startTimeOfDistance;
    @DateTimeFormat(pattern = "H:m:s")
    private Time endTimeOfDistance;
}
