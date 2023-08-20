package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "order_items")
@Table(name = "order_items", schema = "biztrip_database", catalog = "")
public class OrderItemEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "sub_amount")
    private Double subAmount;
    @Basic
    @Column(name = "booking_ticket_id")
    private long bookingTicketId;
    @Basic
    @Column(name = "order_id")
    private long orderId;
    @Basic
    @Column(name = "created_at")
    private Date createdAt;
}
