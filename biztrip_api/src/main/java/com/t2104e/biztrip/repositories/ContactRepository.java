package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.ContactEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<ContactEntity, Long> {
    @Query("SELECT c from contacts c where concat(c.fullName, c.title, c.status, c.phoneNumber, c.phoneNumber, c.createdAt, c.content) LIKE %?1%")
    public Page<ContactEntity> findByKeyword(String keyword, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE contacts c SET c.status = true, c.updatedAt = :updatedAt WHERE c.id = :id")
    void updateContact(@Param("updatedAt") Date updatedAt, @Param("id") long id);


}