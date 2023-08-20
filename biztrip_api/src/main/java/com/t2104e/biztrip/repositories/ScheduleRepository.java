package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.dto.ScheduleDetailDto;
import com.t2104e.biztrip.entities.ScheduleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<ScheduleEntity, Long> {
    Optional<ScheduleEntity> findFirstByDepartureIdOrDestinationId(long departureId, long destinationId);

    @Query("SELECT s from schedules s where concat(s.scheduleCode, s.createdAt, s.updatedAt, s.status, s.isPopular) like %?1%")
    Page<ScheduleEntity> findByKeyword(String keyword, Pageable pageable);

    @Query(value = "SELECT s from schedules s WHERE s.id = ?1")
    Optional<ScheduleEntity> findDetailById(long id);

    Optional<ScheduleEntity> getScheduleEntityByDepartureIdAndDestinationId(long departureId, long destinationId);

    Optional<ScheduleEntity> findScheduleEntitiesByDepartureIdAndDestinationIdAndIdNot(long departureId, long destinationId, long id);

    Optional<ScheduleEntity> findScheduleEntitiesByScheduleCode(String code);

    @Query("SELECT s from schedules s where s.isPopular = true order by s.updatedAt desc")
    List<ScheduleEntity> findScheduleEntitiesByPopularIsTrue();
}
