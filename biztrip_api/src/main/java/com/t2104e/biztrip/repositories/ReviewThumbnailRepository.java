package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.ReviewEntity;
import com.t2104e.biztrip.entities.ReviewThumbnailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewThumbnailRepository extends JpaRepository<ReviewThumbnailEntity, Long> {
    List<ReviewThumbnailEntity> findAllByReviewId(ReviewEntity reviewId);
}
