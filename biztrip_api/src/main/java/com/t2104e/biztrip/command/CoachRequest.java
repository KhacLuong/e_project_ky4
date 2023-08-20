package com.t2104e.biztrip.command;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CoachRequest {
    private long id;
    @NotEmpty(message = "trường này không được để trống")
    private String name;
    private String imagePath;

    @NotEmpty(message = "trường này không được để trống")
    @Size(max = 20)
    private String plateNumber;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long totalSeats;

    @Min(value = 0, message = "Giá trị không hợp lệ")
    private long priceFrom;

    private String description;

    private String status;
    private List<UtilityRequest> utilities;
    private List<SeatRequest> seats;
    private List<ThumbnailRequest> thumbnails;
//    private List<DistanceRequest> distances;
}
