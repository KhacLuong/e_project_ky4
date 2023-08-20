package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.EmployeeInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeInfoRepository extends JpaRepository<EmployeeInfoEntity, Long> {
}
