package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.DistanceDetailDto;
import com.t2104e.biztrip.dto.DistanceDto;
import com.t2104e.biztrip.entities.DistanceEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.sql.Time;
import java.util.List;
import java.util.Optional;

public interface DistanceRepository extends JpaRepository<DistanceEntity, Long> {

    boolean existsByCoachIdAndScheduleId(long coachId, long scheduleId);

//    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDto(d.id, l1.name, l2.name , sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
//            "FROM schedules s, coaches c, distances d, locations l1, locations l2 WHERE sp.scheduleId = ?1 AND sp.locationId=l.id AND " +
//            " (concat(sp.time,sp.status, sp.createdAt, sp.updatedAt) like %?2% OR  l.name like %?2%)")
//    List<PickUpDto> findByKeyword(long scheduleId, String keyword, Sort sort);


    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDto(d.id,l1.name, l2.name,d.timeDifference,d.startTime, d.endTime, d.createdAt, d.updatedAt) " +
            "FROM distances  d, coaches c, schedules s, locations l1, locations  l2 WHERE d.coachId = ?1 AND c.id=d.coachId" +
            " AND s.id = d.scheduleId AND l1.id = s.departureId AND l2.id = s.destinationId AND" +
            " (concat(l1.name, l2.name,d.timeDifference, d.createdAt, d.updatedAt) like %?2% )")
    List<DistanceDto> findByCoachIdAndSearchByKeyword(long scheduleId, String keyword, Sort sort);
//    OR  l.name like %?2%


    List<DistanceEntity> findAllByCoachId(long coachId);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDetailDto(d.id, c, s, d.timeDifference,d.startTime, d.endTime,  d.createdAt, d.updatedAt) FROM schedules s , distances d, coaches c" +
            " WHERE d.id = ?1 AND s.id = d.scheduleId AND c.id = d.coachId")
    Optional<DistanceDetailDto> findDetailById(long id);


    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDetailDto(d.id, c, s, d.timeDifference,d.startTime, d.endTime, d.createdAt, d.updatedAt) FROM schedules s , distances d, coaches c" +
            " WHERE d.coachId = :coachId AND s.id = d.scheduleId AND c.id = d.coachId")
    List<DistanceDetailDto> findDetailByCoachId(long coachId);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDto(d.id, l1.name, l2.name, d.timeDifference,d.startTime, d.endTime, d.createdAt, d.updatedAt) FROM schedules s , distances d, coaches c,  locations l1, locations  l2 " +
            "WHERE d.coachId = :coachId AND s.id = d.scheduleId AND c.id = d.coachId  AND l1.id = s.departureId AND l2.id = s.destinationId")
    List<DistanceDto> findDtoByCoachId(long coachId);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDto(d.id, l1.name, l2.name, d.timeDifference,d.startTime, d.endTime, d.createdAt, d.updatedAt) FROM  distances d,distance_pick_up_point pu, distance_drop_off_point do, locations l1, locations  l2 " +
            "WHERE d.coachId = :coachId AND pu.distanceId = d.id AND do.distanceId = d.id  AND pu.locationId = :departureId AND do.locationId = :destinationId AND l1.id = pu.locationId  AND l2.id = do.locationId")
    List<DistanceDto> findDtoByCoachIdAndDepartureAndDestination(long coachId, long departureId, long destinationId);


    @Query(value = "SELECT new com.t2104e.biztrip.dto.DistanceDetailDto(d.id, c, s, d.timeDifference,d.startTime, d.endTime,  d.createdAt, d.updatedAt) FROM schedules s , distances d, coaches c" +
            " WHERE d.scheduleId= :scheduleId AND s.id =  d.scheduleId and c.id = d.coachId")
    List<DistanceDetailDto> getDetailByScheduleId(long scheduleId);

    void deleteAllByScheduleId(long scheduleId);

    void deleteAllByCoachId(long coachId);

    List<DistanceEntity> findAllByScheduleIdAndStartTimeGreaterThanEqualAndStartTimeLessThanEqual(long scheduleId, Time timeAfter, Time timeBefore);

    List<DistanceEntity> findAllByScheduleId(long scheduleId);

    @Query("SELECT d from distances d where d.scheduleId = ?1 " +
            "and d.startTime >= ?2 " +
            "and d.startTime <= ?3 " +
            "and (d.id IN (SELECT pup.distanceId from distance_pick_up_point pup where pup.locationId IN ?4) " +
            "OR d.id IN (SELECT dop.distanceId from distance_drop_off_point dop where dop.locationId IN ?5))")
    List<DistanceEntity> findListDistanceByScheduleIdAndFilter(long scheduleId, Time timeAfter, Time timeBefore, Long[] listPickUp, Long[] listDropOff);

    @Query("select count(d.id) from distances d where d.startTime >= '00:00:00' and d.startTime <= '06:00:00' and d.scheduleId = ?1")
    int countDistanceByTimeDawn(long scheduleId);

    @Query("select count(d.id) from distances d where d.startTime >= '06:01:00' and d.startTime <= '12:00:00' and d.scheduleId = ?1")
    int countDistanceByTimeMorning(long scheduleId);

    @Query("select count(d.id) from distances d where d.startTime >= '12:01:00' and d.startTime <= '18:00:00' and d.scheduleId = ?1")
    int countDistanceByTimeAfternoon(long scheduleId);

    @Query("select count(d.id) from distances d where d.startTime >= '18:01:00' and d.startTime <= '23:59:59' and d.scheduleId = ?1")
    int countDistanceByTimeEvening(long scheduleId);
}
