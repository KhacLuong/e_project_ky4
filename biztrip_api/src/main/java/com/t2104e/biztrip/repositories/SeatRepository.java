package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.SeatEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<SeatEntity, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM seats s WHERE s.id NOT IN :excludedIds AND s.coachId.id = :coachId")
    void deleteByIdNotInAndCoachId(@Param("excludedIds") List<Long> excludedIds, @Param("coachId") Long coachId);


}
