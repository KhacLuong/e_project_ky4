package com.t2104e.biztrip.command;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DropOffRequest {
    private long id;

//    @Min(value = 0, message = "Giá trị không hợp lệ")
//    private long distanceId;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long locationId;

    @Pattern(regexp = "^([01]\\d|2[0-3]):([0-5]\\d)$", message = "thời gian phải có định dạng hh:mm")
    @NotEmpty(message = "Không được bỏ trống trường này")
    private String  time;

    private String status;
}
