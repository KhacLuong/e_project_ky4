package com.t2104e.biztrip.entities;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
@Entity(name = "locations")
@Table(name = "locations", schema = "biztrip_database", catalog = "")
public class LocationEntity {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @NotEmpty(message = "this field is mandatory")
    @NotNull(message = "this field is mandatory")
    @Column(name = "location_name")
    private String name;


    @Basic
    @Column(name = "address")
    private String address;

    @Basic
    @Column(name = "parent_id")
    private long parentId;
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

    public boolean getStatus() {
        return this.status;
    }

    public LocationEntity(String address, String createdAt , String name, long parentId, boolean status, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        this.name = name;
        this.address = address;
        this.parentId = parentId;
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
