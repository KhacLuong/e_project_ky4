package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import org.springframework.validation.BindingResult;

import java.sql.Time;

public interface ICoachService {
     ResponseDTO<?> getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
     ResponseDTO<?> getDetail(long id);
     ResponseDTO<?> delete(long id);
     ResponseDTO<?> createCoach(CoachRequest coachRequest , BindingResult result);
     ResponseDTO<?> updateCoach(CoachRequest coachRequest , BindingResult result);
     ResponseDTO<?> getAllCoachByPickUpAndDropOff(long locationId1, long locationId2);
     ResponseDTO<?> getAllCoachByPickUpTime(String time1, String time2);
     ResponseDTO<?> getAllCoachByDropOffTime(String time1, String time2);

     ResponseDTO<?> searchAllCoach( Long  departureId, Long destinationId, String time1, String time2, Double priceMin, Double priceMax);
     ResponseDTO<?> getCoachByDistanceId(long distanceId);
     ResponseDTO<?> getListCoachByDistanceByScheduleAndTime(long scheduleId,long departureInSchedule, long destinationInSchedule, String date, int pageNumber, int perPage, String sortField, String sortDir, String timeSlot, double priceMin, double priceMax, long availableSeat, String typeRow, String pickUp, String dropOff, int rating);

     ResponseDTO<?> getListSeatByCoachIdAndTime(long coachId, String startTimeOfDistance, String endTimeOfDistance, String date);

//     ResponseDTO<?> getAllCoachByPiDropOffLocationId(long locationId);

}
