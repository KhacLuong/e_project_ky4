package com.t2104e.biztrip.repositories;



import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface CoachRepository extends JpaRepository<CoachEntity, Long> {
    @Query("SELECT c from coaches c where concat(c.plateNumber, c.totalSeats, c.priceFrom, c.description, c.status, c.createdAt, c.updatedAt) like %?1%")
    public Page<CoachEntity> findByKeyword(String keyword, Pageable pageable);

//    @Query("SELECT c from coaches c where  c.id in(select d.coachId from distances d where d.id = ?1)")
//    public List<CoachEntity> findAllByDistanceId(long distanceId);

    @Query("SELECT c from coaches c where c.id in(select d.coachId from distances d where d.id = ?1)")
    CoachEntity findAllByDistanceId(long distanceId);

    boolean existsByPlateNumber(String plateNumber);

    boolean existsByPlateNumberAndIdNot(String plateNumber, long id);

    @Query("SELECT c FROM coaches c JOIN c.utilities u WHERE u = :utility")
    List<CoachEntity> findCoachesByUtility(@Param("utility") UtilityEntity utility);


    @Query(value = "select c " +
            "from coaches c where c.id in " +
            "(select d.coachId from distances d where d.id in " +
            "(select p.distanceId from distance_pick_up_point p where p.locationId =?1) " +
            " and d.id in (select dr.distanceId from distance_drop_off_point dr where dr.locationId =?2))")
    List<CoachEntity> getAllCoachByPickUpAnDropOff(long LocationIdOffPickUp, long locationIdOffDropOff);

    @Query(value = "select c " +
            "from coaches c where c.id in " +
            "(select d.coachId from distances d where d.id in " +
            "(select p.distanceId from distance_pick_up_point p where p.time between ?1 and ?2))")
    List<CoachEntity> getAllCoachByDropOffTime(LocalTime time1, LocalTime time2);


    @Query(value = "select c " +
            "from coaches c where c.id in " +
            "(select d.coachId from distances d where d.id in " +
            "(select p.distanceId from distance_drop_off_point p where p.time between ?1 and ?2))")
    List<CoachEntity> getListCoachByPickUpTime(LocalTime time1, LocalTime time2);

    @Query(value = "select c " +
            "from coaches c where c.id in " +
            "(select d.coachId from distances d where d.id in " +
            "(select p.distanceId from distance_drop_off_point p where p.time between ?1 and ?2))")
    List<CoachEntity> getListCoachByPickUpAndDropOffFilterByTime(LocalTime time1, LocalTime time2);

//    @Query(value = "select c from coaches c, distances d, distance_pick_up_point  sp, distance_drop_off_point dr where d.id = sp.distanceId and  " +
//            "(:distanceId IS NULL OR c.id = :distanceId) and (:priceMin<=0 or c.priceFrom = :priceMin) and " +
//            "(:departureId<=0 or (sp.id = :departureId and d.id = sp.distanceId and c.id = d.coachId)) and " +
//            "(:destinationId<=0 or (dr.id = :destinationId and d.id = dr.distanceId and c.id = d.coachId))")



//    @Query(value = "SELECT  new com.t2104e.biztrip.dto.CoachDetailDto(c.id, c.name,c.imagePath, c.plateNumber, c.totalSeats," +
//            "c.priceFrom, c.description, c.status,c.createdAt, c.updatedAt,c.utilities,c.seats,  c.thumbnails,  ) FROM coaches c " +
//            "left JOIN   distances d ON c.id =  d.coachId " +
//            "left JOIN distance_drop_off_point sd ON d.id  = sd.distanceId " +
//            "left JOIN distance_pick_up_point sp ON d.id = sp.distanceId " +
//            "where  sp.locationId = :departureId and sd.locationId =:destinationId and sp.distanceId = sd.distanceId " +
//            "and sp.time between :time1 and :time2 and (:priceMax is null or c.priceFrom <= :priceMax) and (:priceMin is null or c.priceFrom >= :priceMin)")
//    List<CoachFilterDto> searchCoach(long  departureId, long destinationId, LocalTime time1, LocalTime time2, Double priceMin, Double priceMax);


    @Query(value = "SELECT c FROM coaches c " +
            "left JOIN distances d ON c.id =  d.coachId " +
            "left JOIN distance_drop_off_point sd ON d.id  = sd.distanceId " +
            "left JOIN distance_pick_up_point sp ON d.id = sp.distanceId " +
            "where  sp.locationId = :departureId and sd.locationId =:destinationId and sp.distanceId = sd.distanceId " +
            "and sp.time between :time1 and :time2 and (:priceMax is null or c.priceFrom <= :priceMax) and (:priceMin is null or c.priceFrom >= :priceMin)")
    List<CoachEntity> searchCoach(long  departureId, long destinationId, LocalTime time1, LocalTime time2, Double priceMin, Double priceMax);

    @Query("SELECT c FROM coaches c WHERE c.id = ?1 AND c.priceFrom >= ?2 AND c.priceFrom <= ?3 AND ((SELECT COUNT(r) FROM reviews r WHERE r.coachId = c) = 0 OR (SELECT AVG(r.generalRating) FROM reviews r WHERE r.coachId = c) >= ?4)")
    Optional<CoachEntity> findCoachEntitiesByIdAndPriceAndRating(long id, double priceMin, double priceMax, int rating);

}


