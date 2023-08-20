package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.ThumbnailEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ThumbnailRepository extends JpaRepository<ThumbnailEntity, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM thumbnails t WHERE t.id NOT IN :excludedIds AND t.coachId.id = :coachId")
    void deleteByIdNotInAndCoachId(@Param("excludedIds") List<Long> excludedIds, @Param("coachId") Long coachId);

    @Transactional
    @Modifying
    @Query("DELETE FROM thumbnails t where t.coachId.id = :coachId")
    void deleteByCoachId(@Param("coachId") Long coachId);
}
