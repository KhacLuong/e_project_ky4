package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.EmployeeDistanceEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface DivisionRepository extends JpaRepository<EmployeeDistanceEntity, Long> {
    Optional<EmployeeDistanceEntity> findEmployeeDistanceByDistanceIdAndDate(long distanceId, Date date);
}
