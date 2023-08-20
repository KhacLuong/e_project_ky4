package com.t2104e.biztrip.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.Nullable;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Builder
@Getter // rút gọn getter
@Setter // rút gọn setter
@NoArgsConstructor // thay thế constructor không tham số
@AllArgsConstructor // thay thế constructor có tham số
@Entity(name = "distances")
@Table(name = "distances", schema = "biztrip_database", catalog = "")
public class DistanceEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;

    @Basic
    @Column(name = "coach_id", nullable = false)
    private long coachId;
    @Basic
    @Column(name = "schedule_id", nullable = false)
    private long scheduleId;

    @Basic
    @Min(value = 0, message = "Gia tri time_difference phải lớn hơn 0")
    @Column(name = "time_difference") //1: lap tung ngay, //2: lap nhieu ngay
    private int timeDifference;
    @Basic
    @Column(name = "start_time")
    @DateTimeFormat(pattern = "H:m:s")
    private Time startTime;

    @Basic
    @Column(name = "end_time")
    @DateTimeFormat(pattern = "H:m:s")
    private Time endTime;

    @Column(name = "create_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date createdAt;

    @Basic
    @Column(name = "updated_at", columnDefinition = "TIMESTAMP")
    @DateTimeFormat(pattern = "yyyy-MM-dd H:m:s")
    private Date updatedAt;

    public DistanceEntity(long coachId, String createdAt, String endTime, long scheduleId, String startTime, int timeDifference, String updatedAt) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        SimpleDateFormat dateFormat2 = new SimpleDateFormat("HH:mm:ss");

        this.coachId = coachId;
        this.scheduleId = scheduleId;
        this.timeDifference = timeDifference;
        try {

            java.util.Date parsedTime = startTime != null ? dateFormat2.parse(startTime) : null;
            this.startTime = parsedTime != null ? new Time(parsedTime.getTime()) : null;
        } catch (ParseException e) {
            this.startTime = null;
        }
        try {

            java.util.Date parsedTime = endTime != null ? dateFormat2.parse(endTime) : null;
            this.endTime = parsedTime != null ? new Time(parsedTime.getTime()) : null;
        } catch (ParseException e) {
            this.endTime = null;
        }

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
