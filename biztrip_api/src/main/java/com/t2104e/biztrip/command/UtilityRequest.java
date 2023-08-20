package com.t2104e.biztrip.command;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UtilityRequest {
    private long id;
    private String title;
    private String imagePath;
    private String description;
    private boolean status;
    public boolean getStatus() {
        return this.status;
    }
}
