package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.ReviewEntity;
import com.t2104e.biztrip.entities.State;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ReviewRepository extends JpaRepository<ReviewEntity, Long> {
//    @Query("select r from reviews r where r.coachId = ?1")
//    Page<ReviewEntity> getReviewEntitiesByCoachId(long id, Pageable pageable);

    boolean existsReviewEntitiesByBookingTicketId(long bookingTicketId);

    @Query("SELECT r from reviews r where r.coachId.id = ?1")
    List<ReviewEntity> findAllByCoachId(long coachId);
    @Query("SELECT avg(r.safeRating) from reviews r where r.coachId = ?1")
    Double avgOfSafeRating(CoachEntity coachId);
    @Query("SELECT avg(r.generalRating) from reviews r where r.coachId = ?1")
    Double avgOfGeneralRating(CoachEntity coachId);
    @Query("SELECT avg(r.comfortableRating) from reviews r where r.coachId = ?1")
    Double avgOfComfortableRating(CoachEntity coachId);
    @Query("SELECT avg(r.employeeAttitudeRating) from reviews r where r.coachId = ?1")
    Double avgOfEmployeeAttitudeRating(CoachEntity coachId);
    @Query("SELECT avg(r.fullInformationRating) from reviews r where r.coachId = ?1")
    Double avgOfFullInformationRating(CoachEntity coachId);
    @Query("SELECT avg(r.serviceQualityRating) from reviews r where r.coachId = ?1")
    Double avgOfServiceQualityRating(CoachEntity coachId);
    @Query("SELECT avg (r.verifiedInformationRating) from reviews r where r.coachId = ?1")
    Double avgOfVerifiedInformationRating(CoachEntity coachId);
    @Query("SELECT count(r.comment) from reviews r where r.coachId = ?1 and r.comment is not null ")
    int countOfReviewHaveComment(CoachEntity coachId);
    @Query("SELECT count(rt.imagePath) from reviews r join review_thumbnails rt on  r = rt.reviewId where r.coachId = ?1")
    int countOfReviewHaveImage(CoachEntity coachId);
  ;
}
