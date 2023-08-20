package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.PickUpDetailDto;
import com.t2104e.biztrip.dto.PickUpDto;
import com.t2104e.biztrip.entities.PickUpPointEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PickUpRepository extends JpaRepository<PickUpPointEntity, Long> {

    @Query(value = "SELECT new com.t2104e.biztrip.dto.PickUpDto(sp.id, sp.isDefault, l.name, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
            "FROM distance_pick_up_point sp, locations l WHERE sp.distanceId = ?1 AND l.id = sp.locationId AND " +
            " (concat(sp.time,sp.status,sp.createdAt,sp.updatedAt) like %?2%)")
    List<PickUpDto> findByKeyword(long scheduleId, String keyword, Sort sort);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.PickUpDto(sp.id, sp.isDefault, l.name, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
            "FROM distance_pick_up_point sp, locations l WHERE sp.distanceId = :distanceId AND l.id = sp.locationId")
    List<PickUpDto> findAllByDistanceId(long distanceId);

    List<PickUpPointEntity> findPickUpPointEntitiesByDistanceIdOrderByTimeAsc(long distanceId);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.PickUpDetailDto(sp.id, sp.isDefault, d, l, sp.time, sp.status, sp.createdAt, sp.updatedAt) FROM distance_pick_up_point sp, distances d , locations l" +
            " WHERE sp.id = ?1 AND d.id = sp.distanceId AND sp.locationId = l.id")
    Optional<PickUpDetailDto> findDetailById(long id);

    void deleteAllByDistanceId(long id);

    @Query("select p from distance_pick_up_point p where p.distanceId = ?1 and p.isDefault = true")
    Optional<PickUpPointEntity> findPickUpPointEntitiesByDistanceIdAndDefaultIsTrue(long distanceId);
}
