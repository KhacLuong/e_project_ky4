package com.t2104e.biztrip.controllers;


import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.services.interfaces.IPickUpPointService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/pick_up_points")
@RequiredArgsConstructor
public class PickUpPointController {

    @Autowired
    private IPickUpPointService pickUpPointService;

    @GetMapping("")
    public ResponseEntity<?> index(long distanceId,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "keyword", required = false) String keyword) {
        var data = pickUpPointService.getListPickUpPointByDistanceId(distanceId,sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = pickUpPointService.getDetail(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = pickUpPointService.delete(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @DeleteMapping("/delete_by_distance_id")
    public ResponseEntity<?> deleteByDistanceId(long distanceId) {
        var data = pickUpPointService.deleteByDistanceId(distanceId);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }


    @PostMapping("")
    public ResponseEntity<?> create(@RequestParam("distanceId") long distanceId,@Valid @RequestBody PickUpRequest request, BindingResult result) {
        var data = pickUpPointService.save(distanceId,request, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("create_list")
    public ResponseEntity<?> create(@RequestParam("distanceId") long distanceId, @Valid @RequestBody List<PickUpRequest> requests, BindingResult result) {
        var data = pickUpPointService.saveList(distanceId,requests, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

}
