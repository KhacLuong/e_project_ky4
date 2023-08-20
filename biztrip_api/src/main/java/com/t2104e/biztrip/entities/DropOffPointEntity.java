package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;
import org.checkerframework.checker.units.qual.C;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;


@Builder
@Getter // rút gọn getter
@Setter // rút gọn setter
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "distance_drop_off_point")
@Table(name = "distance_drop_off_point", schema = "biztrip_database", catalog = "")
public class DropOffPointEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @Column(name = "distance_id", nullable = false)
    private long distanceId;


    @Basic
    @Column(name = "location_id", nullable = false)
    private long locationId;

    @Basic
    @Column(name = "time", nullable = false)
    private LocalTime time;

    @Basic
    @Column(name = "status")
    private String status;

    @Basic
    @Column(name = "is_default")
    private boolean isDefault;

    @Basic
    @Column(name = "create_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;


    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public DropOffPointEntity(String createdAt, int date, int day,  long distanceId,boolean isDefault, long locationId, String status,String  time, String  updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        DateTimeFormatter timeFormat = DateTimeFormatter.ofPattern("HH:mm:ss");
        this.distanceId = distanceId;
        this.locationId = locationId;
        this.time = LocalTime.parse(time, timeFormat);
        this.status = status;
        this.isDefault = isDefault;
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
