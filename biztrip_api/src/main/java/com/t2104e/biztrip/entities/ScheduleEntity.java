package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "schedules")
@Table(name = "schedules", schema = "biztrip_database", catalog = "")
public class ScheduleEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @Column(name = "schedule_code")
    private String scheduleCode;

    @Basic
    @Column(name = "image_path")
    private String imagePath;

    @Basic
    @Column(name = "departure_id", nullable = false)
    private long departureId;

    @Basic
    @Column(name = "destination_id", nullable = false)
    private long destinationId;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "is_popular")
    private boolean isPopular;

    @Basic
    @Column(name = "create_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;


    public ScheduleEntity(String createdAt, long departureId, long destinationId, String imagePath, boolean isPopular, String scheduleCode, String status, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.id = id;
        this.scheduleCode = scheduleCode;
        this.imagePath = imagePath;
        this.departureId = departureId;
        this.destinationId = destinationId;
        this.status = status;
        this.isPopular = isPopular;

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
