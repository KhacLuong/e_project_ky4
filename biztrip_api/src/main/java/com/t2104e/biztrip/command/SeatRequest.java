package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.TypeRow;
import jakarta.persistence.Basic;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SeatRequest {
    private long id;
    private String seatCode;
    private String type;
    private long position;
    private TypeRow typeRow;
    private long priceTicketId;
}
