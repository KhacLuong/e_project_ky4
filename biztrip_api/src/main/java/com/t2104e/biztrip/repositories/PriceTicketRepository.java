package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.PriceTicketEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceTicketRepository extends JpaRepository<PriceTicketEntity, Long> {
    @Query("select t from price_ticket t where concat(t.title, t.fare, t.createdAt, t.updatedAt) like %?1%")
    Page<PriceTicketEntity> findByKeyword(String Keyword, Pageable pageable);
}
