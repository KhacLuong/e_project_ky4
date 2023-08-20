package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "price_ticket")
@Table(name = "price_ticket", schema = "biztrip_database", catalog = "")
public class PriceTicketEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id; 
    @Basic
    @Column(name = "title", nullable = false)
    private String title;
    @Basic
    @Column(name = "fare", nullable = false)
    private double fare;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    @OneToMany(mappedBy = "priceTicketId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<SeatEntity> seats;

    public PriceTicketEntity(long id, String createdAt, double fare, String title, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.id = id;
        this.title = title;
        this.fare = fare;
        try {
            this.createdAt = createdAt!=null ? dateFormat.parse(createdAt) : null;
        } catch (ParseException e) {
            this.createdAt = null;
        }
        try {
            if (updatedAt!=null) {
                this.updatedAt = dateFormat.parse(updatedAt);
            }
        } catch (ParseException e) {
        }
    }
}
