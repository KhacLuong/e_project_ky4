package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
@Entity(name = "reviews")
@Table(name = "reviews", schema = "biztrip_database", catalog = "")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class ReviewEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private UserEntity userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "coach_id", nullable = false)
    @JsonIgnore
    private CoachEntity coachId;

    @Basic
    @Column(name = "safe_rating")
    @Min(1)
    @Max(5)
    private int safeRating;

    @Basic
    @Column(name = "full_information_rating")
    @Min(1)
    @Max(5)
    private int fullInformationRating;

    @Basic
    @Column(name = "verified_information_rating")
    @Min(1)
    @Max(5)
    private int verifiedInformationRating;

    @Basic
    @Column(name = "comfortable_rating")
    @Min(1)
    @Max(5)
    private int comfortableRating;

    @Basic
    @Column(name = "service_quality_rating")
    @Min(1)
    @Max(5)
    private int serviceQualityRating;

    @Basic
    @Column(name = "employee_attitude_rating")
    @Min(1)
    @Max(5)
    private int employeeAttitudeRating;

    @Basic
    @Column(name = "general_rating")
    @Min(1)
    @Max(5)
    private int generalRating;

    @Basic
    @Column(name = "comment", columnDefinition = "text")
    private String comment;

    @OneToMany(mappedBy="reviewId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ReviewThumbnailEntity> reviewThumbnails;

    @Basic
    @Column(name = "booking_ticket_id")
    private long bookingTicketId;

    @Basic
    @Column(name = "time_to_add")
    private Date timeToAdd;
    @Basic
    @Column(name = "time_to_expire")
    private Date timeToExpire;

    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

}
