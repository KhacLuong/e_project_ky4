package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.DivisionRequest;
import com.t2104e.biztrip.entities.EmployeeDistanceEntity;
import com.t2104e.biztrip.entities.EmployeeDistanceStatus;
import com.t2104e.biztrip.services.interfaces.IDivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.Date;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
    @RequestMapping("/api/v1/division")
public class DivisionController {
    @Autowired
    private IDivisionService iDivisionService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "scheduleId", required = false) long scheduleId, @RequestParam(value = "date", required = false) String date, @RequestParam("pageNumber") int pageNumber,
    @RequestParam("perPage") int perPage) throws ParseException {
        var data = iDivisionService.getListByParams(scheduleId, date, pageNumber, perPage);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody DivisionRequest divisionRequest) {
        var data = iDivisionService.createDivision(divisionRequest);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable(name = "id") long id, @RequestParam(value = "employeeInfoId", required = false) long employeeInfoId, @RequestParam(value = "status", required = false)  EmployeeDistanceStatus status) {
        var data = iDivisionService.updateDivision(id, employeeInfoId, status);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
