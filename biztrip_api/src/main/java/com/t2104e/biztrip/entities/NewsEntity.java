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
@Entity(name = "news")
@Table(name = "news", schema = "biztrip_database", catalog = "")
public class NewsEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "title", nullable = false)
    @Size(max = 255)
    private String title;
    @Basic
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    @Basic
    @Column(name = "summary", nullable = false,columnDefinition = "text")
    private String summary;
    @Basic
    @Column(name = "content", nullable = false,columnDefinition = "text")
    private String content;
    @Basic
    @Column(name = "slug", nullable = false)
    private String slug;
    @Basic
    @Column(name = "author_name")
    private String authorName;
    @Basic
    @Column(name = "status")
    private boolean status;
    @Basic
    @Column(name = "type")
    @Size(max = 45)
    private String type;
    @Basic
    @Column(name = "view")
    private long view;
    @Basic
    @Column(name = "created_at" ,columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
}
