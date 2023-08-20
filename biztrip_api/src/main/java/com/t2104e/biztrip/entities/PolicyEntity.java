package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "policies")
@Table(name = "policies", schema = "biztrip_database", catalog = "")
public class PolicyEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "title", nullable = false)
    @Size(max = 255)
    private String title;
    @Basic
    @Column(name = "content", nullable = false,columnDefinition = "text")
    private String content;
    @Basic
    @Column(name = "info",columnDefinition = "text")
    private String info;
    @Basic
    @Column(name = "position", unique = true)
    private int position;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
