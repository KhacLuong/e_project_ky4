package com.t2104e.biztrip.command;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ScheduleRequest {

    private long id;

    private String imagePath;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long departureId;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long destinationId;


    private String status;

    private boolean isPopular;
    private String scheduleCode;
}
