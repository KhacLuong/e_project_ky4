package com.t2104e.biztrip.dto;

import lombok.*;
@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ThumbnailDto {
    private long id;
    private String imagePath;
    private String title;
}
