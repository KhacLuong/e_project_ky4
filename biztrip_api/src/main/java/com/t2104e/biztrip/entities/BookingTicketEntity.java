package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "booking_tickets")
@Table(name = "booking_tickets", schema = "biztrip_database", catalog = "")
public class BookingTicketEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "reservation_code")
    private String reservationCode;
    @Basic
    @Column(name = "price")
    private double price;
    @Basic
    @Column(name = "date", columnDefinition="date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @Basic
    @Column(name = "distance_id")
    private long distanceId;
    @Basic
    @Column(name = "pick_up_id")
    private long pickUpPointId;
    @Basic
    @Column(name = "drop_off_id")
    private long dropOffPointId;
    @Basic
    @Column(name = "user_id")
    private long userId;
    @Basic
    @Column(name = "coach_id")
    private long coachId;
    @Basic
    @Column(name = "state")
    @Enumerated(EnumType.STRING)
    private State state;
    @Basic
    @Column(name = "help_booking")
    private Boolean helpBooking;
    @Basic
    @Column(name = "passenger_name")
    private String passengerName;
    @Basic
    @Column(name = "passenger_phone")
    private String passengerPhoneNumber;
    @Basic
    @Column(name = "passenger_email")
    private String passengerEmail;
    @Basic
    @Column(name = "note", columnDefinition = "text")
    private String note;
    @Basic
    @Column(name = "time_to_add")
    private Date timeToAdd;
    @Basic
    @Column(name = "time_to_expire")
    private Date timeToExpire;
    @Basic
    @Column(name = "created_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;
    @Basic
    @Column(name = "updated_at", columnDefinition="TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;
    @OneToMany(mappedBy="bookingTicketId", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<BookingTicketDetailEntity> bookingTicketDetails;

    public BookingTicketEntity(long coachId, String createdAt, String date,  long distanceId, long dropOffPointId, boolean helpBooking,
                               String note, String passengerEmail, String passengerName, String passengerPhoneNumber, long pickUpPointId,
                               double price,   String reservationCode, State state, String timeToAdd, String timeToExpire, String updatedAt, long userId) {

        SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");


        this.reservationCode = reservationCode;
        this.price = price;
        try {
            this.date = date != null ? dateFormat.parse(date) : null;
        } catch (ParseException e) {
            this.date = null;
        }
        this.distanceId = distanceId;
        this.pickUpPointId = pickUpPointId;
        this.dropOffPointId = dropOffPointId;
        this.userId = userId;
        this.coachId = coachId;
        this.state = state;
        this.helpBooking = helpBooking;
        this.passengerName = passengerName;
        this.passengerPhoneNumber = passengerPhoneNumber;
        this.passengerEmail = passengerEmail;
        this.note = note;
        try {
            this.timeToAdd = timeToAdd != null ? dateTimeFormat.parse(timeToAdd) : null;
        } catch (ParseException e) {
            this.timeToAdd = null;
        }
        try {
            this.timeToExpire = timeToExpire != null ? dateTimeFormat.parse(timeToExpire) : null;
        } catch (ParseException e) {
            this.timeToExpire = null;
        }
        try {
            this.createdAt = createdAt != null ? dateTimeFormat.parse(createdAt) : null;
        } catch (ParseException e) {
            this.createdAt = null;
        }
        try {
            if (updatedAt != null) {
                this.updatedAt = dateTimeFormat.parse(updatedAt);
            }
        } catch (ParseException e) {
        }
    }
}
