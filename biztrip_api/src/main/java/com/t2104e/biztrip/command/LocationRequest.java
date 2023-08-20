package com.t2104e.biztrip.command;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LocationRequest {
    private long id;
    @NotEmpty(message = "this field is mandatory")
    private String name;
    private String address;
    private long parentId;
    private boolean status;

    public boolean getStatus() {
        return this.status;
    }
}
