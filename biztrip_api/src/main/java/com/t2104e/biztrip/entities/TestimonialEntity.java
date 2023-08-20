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
@Entity(name = "testimonials")
@Table(name = "testimonials", schema = "biztrip_database", catalog = "")
public class TestimonialEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "avatar_path")
    private String avatarPath;
    @Basic
    @Column(name = "full_name")
    private String fullName;
    @Basic
    @Column(name = "job")
    private String job;
    @Basic
    @Column(name = "content", columnDefinition = "text")
    private String content;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "is_hot")
    private boolean isHot;
    @Basic
    @Column(name = "status")
    private boolean status;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
