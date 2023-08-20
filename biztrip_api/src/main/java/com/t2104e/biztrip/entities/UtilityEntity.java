package com.t2104e.biztrip.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity(name = "utilities")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "utilities", schema = "biztrip_database", catalog = "")
public class UtilityEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "title", nullable = false)
    private String title;
    @Basic
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    @Basic
    @Column(name = "status", nullable = false)
    private boolean status;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public UtilityEntity(String createdAt, String description, String imagePath, boolean status, String title, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.id = id;
        this.title = title;
        this.description = description;
        this.imagePath = imagePath;
        this.status = status;
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
