package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.DropOffDetailDto;
import com.t2104e.biztrip.dto.DropOffDto;
import com.t2104e.biztrip.entities.DropOffPointEntity;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface DropOffRepository extends JpaRepository<DropOffPointEntity, Long> {

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DropOffDto(sp.id, sp.isDefault, l.name, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
            "FROM distance_drop_off_point sp, locations l WHERE sp.distanceId = ?1 AND l.id = sp.locationId AND " +
            " (concat(sp.time, sp.status,sp.createdAt,sp.updatedAt) like %?2%)")
    List<DropOffDto> findByKeyword(long distanceId, String keyword, Sort sort);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DropOffDto(sp.id, sp.isDefault, l.name, sp.time, sp.status, sp.createdAt, sp.updatedAt)" +
            "FROM distance_drop_off_point sp, locations l WHERE sp.distanceId = ?1 AND l.id = sp.locationId")
    List<DropOffDto> findAllByDistanceId(long distanceId);

    @Query(value = "SELECT new com.t2104e.biztrip.dto.DropOffDetailDto(sp.id, sp.isDefault, d, l, sp.time, sp.status, sp.createdAt, sp.updatedAt) FROM distance_drop_off_point sp, distances d , locations l" +
            " WHERE sp.id = ?1 AND d.id = sp.distanceId AND sp.locationId = l.id")
    Optional<DropOffDetailDto> findDetailById(long id);

    List<DropOffPointEntity> findDropOffPointEntitiesByDistanceIdOrderByTimeAsc(long distanceId);

    void deleteAllByDistanceId(long id);

    @Query("select d from distance_drop_off_point d where d.distanceId = ?1 and d.isDefault = true ")
    Optional<DropOffPointEntity> findDropOffPointEntitiesByDistanceIdAndDefaultIsTrue(long distanceId);

}
