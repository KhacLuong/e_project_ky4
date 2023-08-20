package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@Entity(name = "seats")
@Table(name = "seats", schema = "biztrip_database", catalog = "")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class SeatEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "seat_code")
    private String seatCode;
    @Basic
    @Column(name = "type", nullable = false)
    private String type;
    @Basic
    @Column(name = "position")
    private long position;
    @Basic
    @Column(name = "type_row", nullable = true)
    @Enumerated(EnumType.STRING)
    private TypeRow typeRow;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_id", nullable = false)
    @JsonIgnore
    private CoachEntity coachId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "price_ticket_id")
    private PriceTicketEntity priceTicketId;

    public SeatEntity(String createdAt, long position, String seatCode, String type, TypeRow typeRow, String updatedAt, CoachEntity coachId, PriceTicketEntity priceTicketId) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.id = id;
        this.seatCode = seatCode;
        this.type = type;
        this.position = position;
        this.typeRow = typeRow;
        this.coachId = coachId;
        this.priceTicketId = priceTicketId;

        try {
            this.createdAt = createdAt != null ? dateFormat.parse(createdAt) : null;
        } catch (ParseException e) {
            this.createdAt = null;
        }
        try {
            if (updatedAt != null) {
                this.updatedAt = dateFormat.parse(updatedAt);
            }
        } catch (ParseException e) {
        }
    }
}
