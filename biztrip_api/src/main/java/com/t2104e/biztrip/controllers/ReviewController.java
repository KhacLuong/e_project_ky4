package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.ReviewRequest;
import com.t2104e.biztrip.services.interfaces.IReviewService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/reviews")
@Validated
public class ReviewController {
    @Autowired
    private IReviewService iReviewService;

    @GetMapping("/get-by-coach-id/{coachId}")
    public ResponseEntity<?> getListByCoachId(
            @PathVariable(name = "coachId") long coachId,
            @RequestParam("pageNumber") int pageNumber,
            @RequestParam("perPage") int perPage) {
        var data = iReviewService.getListByCoachId(coachId, pageNumber, perPage);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }

    @PostMapping("")
    public ResponseEntity<?> createReview(@Valid @RequestBody ReviewRequest reviewRequest, BindingResult result) {
        var data = iReviewService.postCreate(reviewRequest, result);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
