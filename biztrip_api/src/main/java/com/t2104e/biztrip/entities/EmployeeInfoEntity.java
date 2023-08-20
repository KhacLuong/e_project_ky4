package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "employee_info")
@Table(name = "employee_info", schema = "biztrip_database", catalog = "")
public class EmployeeInfoEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "user_id")
    private long userId;
    @Basic
    @Column(name = "avatar_path")
    private String avatarPath;
    @Basic
    @Column(name = "address")
    private String address;
    @Basic
    @Column(name = "salary")
    private Double salary;
    @Basic
    @Column(name = "hire_date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date hireDate;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
