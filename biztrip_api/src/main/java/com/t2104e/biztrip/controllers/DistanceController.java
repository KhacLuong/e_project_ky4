package com.t2104e.biztrip.controllers;


import com.t2104e.biztrip.command.DistanceRequest;
import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.services.interfaces.IDistanceService;
import com.t2104e.biztrip.services.interfaces.IDropOffPointService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/distances")
public class DistanceController {

    @Autowired
    private IDistanceService distanceService;


    @GetMapping("")
    public ResponseEntity<?> index(long coachId,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = distanceService.getListDistanceByCoachId(coachId,sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = distanceService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/detail_by_coach")
    public ResponseEntity<?> getListDetailByCoachId(long coachId) {
        var data = distanceService.getListDetailByCoachId(coachId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = distanceService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam("coachId") long coachId, @Valid @RequestBody DistanceRequest request, BindingResult result) {
        var data = distanceService.save(coachId,request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/detail_by_schedule")
    public ResponseEntity<?> getListDetailByScheduleIdAndType(long scheduleId) {
        var data = distanceService.getListDetailScheduleId( scheduleId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/get-count-distance-in-dawn")
    public ResponseEntity<?> getCountOfDistanceInDawn(@RequestParam("scheduleId") long scheduleId) {
        var data = distanceService.getCountOfDistanceInDawn(scheduleId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/get-count-distance-in-morning")
    public ResponseEntity<?> getCountOfDistanceInMorning(@RequestParam("scheduleId") long scheduleId) {
        var data = distanceService.getCountOfDistanceInMorning(scheduleId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/get-count-distance-in-afternoon")
    public ResponseEntity<?> getCountOfDistanceInAfternoon(@RequestParam("scheduleId") long scheduleId) {
        var data = distanceService.getCountOfDistanceInAfternoon(scheduleId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/get-count-distance-in-evening")
    public ResponseEntity<?> getCountOfDistanceInEvening(@RequestParam("scheduleId") long scheduleId) {
        var data = distanceService.getCountOfDistanceInEvening(scheduleId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
