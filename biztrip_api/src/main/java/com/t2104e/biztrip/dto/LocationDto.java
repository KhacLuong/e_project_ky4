package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.LocationEntity;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {
    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String name;
    private String address;
    private boolean status;
    private LocationEntity locationParent;
    private Date createdAt;
    private Date updatedAt;
}
