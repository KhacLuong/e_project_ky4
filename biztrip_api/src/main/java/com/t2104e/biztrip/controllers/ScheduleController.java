package com.t2104e.biztrip.controllers;


import com.t2104e.biztrip.command.ScheduleRequest;
import com.t2104e.biztrip.services.interfaces.IScheduleService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/schedules")
public class ScheduleController {

    @Autowired
    private IScheduleService scheduleService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir) {
        var data = scheduleService.getListSchedules(pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/getSchedulePopular")
    public ResponseEntity<?> getSchedulePopular() {
        var data = scheduleService.getSchedulePopular();
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/getScheduleByCode")
    public ResponseEntity<?> getScheduleByCode(@RequestParam("code") String code) {
        var data = scheduleService.getScheduleByCode(code);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = scheduleService.getScheduleById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody ScheduleRequest request, BindingResult result) {
        var data = scheduleService.save(request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = scheduleService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/getListDetailByDepartureAndDestination")
    public ResponseEntity<?> getScheduleByDepartureAndDestination(long departureId, long destinationId) {
        var data = scheduleService.getScheduleByDepartureAndDestination(departureId, destinationId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
