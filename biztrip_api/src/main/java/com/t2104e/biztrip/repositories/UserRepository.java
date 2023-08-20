package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.UserEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmail(String email);
    @Query("SELECT u from users u where concat(u.email, u.phoneNumber) like %?1%")
    Page<UserEntity> findByKeyword(String Keyword, Pageable pageable);
    Optional<UserEntity> findByPhoneNumber(String phoneNumber);
    boolean existsByVerifyToken(String token);
    boolean existsByPasswordResetToken(String token);
    Optional<UserEntity> findByVerifyToken(String token);
    Optional<UserEntity> findByPasswordResetToken(String token);
}
