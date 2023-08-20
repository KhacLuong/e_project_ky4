package com.t2104e.biztrip.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "booking_ticket_details")
@Table(name = "booking_ticket_details", schema = "biztrip_database", catalog = "")
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class BookingTicketDetailEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Basic
    @Column(name = "seat_id", nullable = false)
    private long seatId;
    @Basic
    @Column(name = "start_time_distance")
    @DateTimeFormat(pattern = "H:m:s")
    private Time startTimeOfDistance;
    @Basic
    @Column(name = "end_time_distance")
    @DateTimeFormat(pattern = "H:m:s")
    private Time endTimeDistance;
    @Basic
    @Column(name = "date", columnDefinition = "date")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date date;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_ticket_id", nullable = false)
    @JsonIgnore
    private BookingTicketEntity bookingTicketId;


    public BookingTicketDetailEntity(String date, String endTimeDistance, long seatId, String startTimeOfDistance, BookingTicketEntity bookingTicketId) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
        this.seatId = seatId;
        try {
            Date dateTime = timeFormat.parse(startTimeOfDistance);
            this.startTimeOfDistance = new Time(dateTime.getTime());
        } catch (ParseException e) {
            this.startTimeOfDistance = null;
        }
        try {
            Date dateTime = timeFormat.parse(endTimeDistance);
            this.endTimeDistance = new Time(dateTime.getTime());
        } catch (ParseException e) {
            this.endTimeDistance = null;
        }
        try {
            if (date != null) {
                this.date = dateFormat.parse(date);
            }
        } catch (ParseException e) {
            this.date = null;
        }
        this.bookingTicketId = bookingTicketId;

    }
}
