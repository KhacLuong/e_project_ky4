package com.t2104e.biztrip.dto;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewThumbnailDto {
    private long id;
    private String imagePath;
}
