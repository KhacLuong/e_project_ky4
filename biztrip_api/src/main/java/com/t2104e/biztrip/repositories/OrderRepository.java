package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    Optional<OrderEntity> findByUserId(long userId);
    Optional<OrderEntity> findByClientSecret(String clientSecret);
}
