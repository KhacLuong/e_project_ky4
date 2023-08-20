package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.ReviewEntity;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReviewThumbnailRequest {
    private long id;
    private String imagePath;
}
