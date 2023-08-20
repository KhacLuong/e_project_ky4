package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.BookingTicketRequest;
import com.t2104e.biztrip.entities.State;
import com.t2104e.biztrip.services.interfaces.IBookingTicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/booking")
@RequiredArgsConstructor
public class BookingTicketController {
    private final IBookingTicketService bookingTicketService;

    @GetMapping("")
    public ResponseEntity<?> index(
        @RequestParam(value = "pageNumber") int pageNumber,
        @RequestParam(value = "perPage") int perPage,
        @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
        @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir
    ) {
        var data = bookingTicketService.getList(pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> detailsById(@PathVariable(name = "id") long id) {
        var data = bookingTicketService.getById(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/users/{userId}")
    public ResponseEntity<?> detailsByUserId(@PathVariable(name = "userId") long userId) {
        var data = bookingTicketService.getByUserId(userId);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping("/users/{userId}/state")
    public ResponseEntity<?> detailsByState(@PathVariable(name = "userId") long userId, @RequestParam(name = "state") State state) {
        var data = bookingTicketService.getByState(userId, state);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }


    @GetMapping("/reservation-code")
    public ResponseEntity<?> detailsByState(@RequestParam(name = "code") String reservationCode) {
        var data = bookingTicketService.getByReservationCode(reservationCode);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping("/create")
    public ResponseEntity<?> create(@RequestBody BookingTicketRequest request) {
        var data = bookingTicketService.booking(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping("/{id}/update")
    public ResponseEntity<?> update(@PathVariable(name = "id") long id, @RequestBody BookingTicketRequest request) {
        var data = bookingTicketService.update(id, request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmTicket(@PathVariable(name = "id") long id) throws ParseException {
        var data = bookingTicketService.confirmTicket(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @PutMapping("/{id}/paid")
    public ResponseEntity<?> paidTicket(@PathVariable(name = "id") long id) throws ParseException {
        var data = bookingTicketService.paidTicket(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancel(@PathVariable(name = "id") long id) {
        var data = bookingTicketService.cancel(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<?> delete (@PathVariable(name = "id") long id) {
        var data = bookingTicketService.delete(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @GetMapping("/count-booking-ticket-confirm")
    public ResponseEntity<?> getCountBookingTicketConfirm () {
        var data = bookingTicketService.getCountBookingTicketConfirm();
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
