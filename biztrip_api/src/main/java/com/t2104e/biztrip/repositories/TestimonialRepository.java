package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.TestimonialEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TestimonialRepository extends JpaRepository<TestimonialEntity, Long> {
    @Query("SELECT t from testimonials t where concat(t.fullName, t.content, t.job) LIKE %?1%")
    public Page<TestimonialEntity> findByKeyword(String keyword, Pageable pageable);
}
