package com.t2104e.biztrip.dto;

import lombok.*;

import java.time.LocalTime;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PickUpDto {
    private long id;
    private long locationId;
    private String locationName;
    private String address;
    private LocalTime time;
    private int day;
    private int date;
    private String status;
    private boolean isDefault;
}
