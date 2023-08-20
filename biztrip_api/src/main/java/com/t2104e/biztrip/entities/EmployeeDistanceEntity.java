package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "employee_distance")
@Table(name = "employee_distance", schema = "biztrip_database", catalog = "")
public class EmployeeDistanceEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "employee_info_id")
    private long employeeInfoId;
    @Basic
    @Column(name = "distance_id")
    private long distanceId;
    @Basic
    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private EmployeeDistanceStatus status;
    @Basic
    @Column(name = "date", columnDefinition="date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @Basic
    @Column(name = "time_to_add")
    private Date timeToAdd;
    @Basic
    @Column(name = "time_to_expire")
    private Date timeToExpire;
    @Basic
    @Column(name = "note", columnDefinition = "text")
    private String note;
    @Basic
    @Column(name = "created_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
