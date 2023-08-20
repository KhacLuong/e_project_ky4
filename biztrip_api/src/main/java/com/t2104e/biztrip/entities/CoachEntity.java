package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
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
@Entity(name = "coaches")
@Table(name = "coaches", schema = "biztrip_database", catalog = "")
public class CoachEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "name")
    private String name;
    @Basic
    @Column(name = "image_path", nullable = false)
    private String imagePath;
    @Basic
    @Column(name = "plate_number", nullable = false, unique = true)
    @Size(max = 20)
    private String plateNumber;
    @Basic
    @Column(name = "total_seats")
    private long totalSeats;

    @Basic
    @Column(name = "price_from")
    private  double priceFrom;

    @Basic()
    @Column(name = "description", columnDefinition = "text")
    private String description;
    @Basic
    @Column(name = "status", nullable = false)
    private String status;
    @Basic
    @Column(name = "created_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    @ManyToMany()
    @JoinTable(
            name = "coach_utilities",
            joinColumns = @JoinColumn(name = "coach_id"),
            inverseJoinColumns = @JoinColumn(name = "utility_id"))
    private Set<UtilityEntity> utilities;

    @OneToMany(mappedBy="coachId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<SeatEntity> seats;
    @OneToMany(mappedBy="coachId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ThumbnailEntity> thumbnails;
    @OneToMany(mappedBy="coachId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ReviewEntity> reviews;
    @OneToMany(mappedBy="coachId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<DistanceEntity> distances;

    public CoachEntity( String createdAt, String description, String imagePath, String name, String plateNumber, double priceFrom, String status, long totalSeats, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

        this.name = name;
        this.imagePath = imagePath;
        this.plateNumber = plateNumber;
        this.totalSeats = totalSeats;
        this.priceFrom = priceFrom;
        this.description = description;
        this.status = status;

        try {
            this.createdAt = createdAt!=null ? dateFormat.parse(createdAt) : null;
        } catch (ParseException e) {
            this.createdAt = null;
        }
        try {
            if (updatedAt!=null) {
                this.updatedAt = dateFormat.parse(updatedAt);
            }
        } catch (ParseException e) {
        }
    }
}
