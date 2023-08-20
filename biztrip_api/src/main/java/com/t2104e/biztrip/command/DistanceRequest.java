package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.DropOffPointEntity;
import com.t2104e.biztrip.entities.PickUpPointEntity;
import lombok.*;
import org.springframework.lang.Nullable;

import java.sql.Time;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DistanceRequest {

    private long id;
    private long coachId;

    private long scheduleId;

    private Time startTime;
    private Time endTime;

    private int timeDifference;

    private List<PickUpPointEntity> pickUpPointList;
    private List<DropOffPointEntity> dropOffPointList;
}
