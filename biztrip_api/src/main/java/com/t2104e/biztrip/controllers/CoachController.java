package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.CoachRequest;
import com.t2104e.biztrip.services.interfaces.ICoachService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/coaches")
public class CoachController {
    @Autowired
    private ICoachService iCoachService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iCoachService.getListCoach(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/get-coach-by-distance-by-schedule-and-time")
    public ResponseEntity<?> getListCoachByDistanceByScheduleAndTime(
            @RequestParam(value = "scheduleId") long scheduleId,
            @RequestParam(value = "departureInSchedule") long departureInSchedule,
            @RequestParam(value = "destinationInSchedule") long destinationInSchedule,
            @RequestParam(value = "date") String date,
            @RequestParam(value = "pageNumber") int pageNumber,
            @RequestParam(value = "perPage") int perPage,
            @RequestParam(value = "sortField", defaultValue = "startTimeOfDistance") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "asc") String sortDir,
            @RequestParam(value = "timeSlot", required = false) String timeSlot,
            @RequestParam(value = "priceMin", defaultValue = "0", required = false) double priceMin,
            @RequestParam(value = "priceMax", defaultValue = "10000000", required = false) double priceMax,
            @RequestParam(value = "availableSeat", defaultValue = "1", required = false) long availableSeat,
            @RequestParam(value = "typeRow", defaultValue = "", required = false) String typeRow,
            @RequestParam(value = "pickUp", required = false) String pickUp,
            @RequestParam(value = "dropOff", required = false) String dropOff,
            @RequestParam(value = "rating", required = false, defaultValue = "0") int rating
            ) {
        var data = iCoachService.getListCoachByDistanceByScheduleAndTime(scheduleId, departureInSchedule, destinationInSchedule, date, pageNumber, perPage, sortField, sortDir, timeSlot, priceMin, priceMax, availableSeat, typeRow, pickUp, dropOff, rating);

        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @GetMapping("/get-seats-by-coach-id-and-time")
    public ResponseEntity<?> getListSeatByCoachIdAndTime(@RequestParam(value = "coachId") long coachId,
                                                         @RequestParam(value = "date") String date,
                                                         @RequestParam(value = "startTimeOfDistance") String startTimeOfDistance,
                                                         @RequestParam(value = "endTimeOfDistance") String endTimeOfDistance) {
        var data = iCoachService.getListSeatByCoachIdAndTime(coachId, startTimeOfDistance, endTimeOfDistance, date);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iCoachService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody CoachRequest request, BindingResult result) {
        var data = iCoachService.createCoach(request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PutMapping("")
    public ResponseEntity<?> update(@Valid @RequestBody CoachRequest request, BindingResult result) {
        var data = iCoachService.updateCoach(request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iCoachService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/get_by_distance")
    public ResponseEntity<?> getCoachByDistance(long id) {
        var data = iCoachService.getCoachByDistanceId(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @GetMapping("/get_by_pick_up_and_drop_off")
    public ResponseEntity<?> getCoachByPickUpPointAndDropOff(long locationIdOffPickUp, long locationIdOffDropOff) {
        var data = iCoachService.getAllCoachByPickUpAndDropOff(locationIdOffPickUp, locationIdOffDropOff);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/get_by_pick_up_time")
    public ResponseEntity<?> getCoachByPickUpTime(String time1, String time2) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        var data = iCoachService.getAllCoachByPickUpTime(time1, time2);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/get_by_pick_drop_off_time")
    public ResponseEntity<?> getCoachByDropOffTime(String time1, String time2) {
        SimpleDateFormat format = new SimpleDateFormat("HH:mm");
        var data = iCoachService.getAllCoachByDropOffTime(time1, time2);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchCoach(
            @RequestParam(required = false) Long departureId,
            @RequestParam(required = false) Long destinationId,
            @RequestParam(required = false) String  time1,
            @RequestParam(required = false) String  time2,
            @RequestParam(required = false) Double  priceMin,
            @RequestParam(required = false) Double  priceMax
    ) {

        var data = iCoachService.searchAllCoach( departureId, destinationId, time1, time2, priceMin, priceMax);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


//    @GetMapping("/drop_off_pont")
//    public ResponseEntity<?> getCoachByDropOffPoint( long locationId) {
//        var data = iCoachService.getAllCoachByPiDropOffLocationId(locationId);
//        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
//    }


    // Coach_Schedule

//    @GetMapping("/{id}/schedules")
//    public ResponseEntity<?> getAllSchedule(@PathVariable(name = "id") long coachId) {
//        var data = iCoachScheduleService.getListScheduleByCoachId(coachId);
//        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
//    }

//    @PostMapping("{id}/save_schedule")
//    public ResponseEntity<?> saveSchedule(@PathVariable(name = "id") long id,@Valid  @RequestParam long scheduleId) {
//        var data = iCoachScheduleService.save(id, scheduleId);
//        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
//    }

//    @PostMapping("{id}/save_list_schedule")
//    public ResponseEntity<?> saveListSchedule(@PathVariable(name = "id") long id,@Valid  @RequestParam List<Long> scheduleIds) {
//        var data = iCoachScheduleService.saveList(id, scheduleIds);
//        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
//    }

//    @DeleteMapping("{id}/delete_schedule/")
//    public ResponseEntity<?> deleteSchedule(@RequestParam("id") long id, @RequestParam long coachScheduleId) {
//        var data = iCoachScheduleService.delete(coachScheduleId);
//        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
//    }

}
