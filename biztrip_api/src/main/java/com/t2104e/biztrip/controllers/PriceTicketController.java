package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.PriceTicketRequest;
import com.t2104e.biztrip.entities.PriceTicketEntity;
import com.t2104e.biztrip.services.interfaces.IPriceTicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/price-ticket")
public class PriceTicketController {
    @Autowired
    IPriceTicketService iTicketService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "pageNumber") int pageNumber, @RequestParam(value = "perPage") int perPage, @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField, @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir, @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iTicketService.getListPriceTicket(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iTicketService.getOnePriceTicketById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody PriceTicketRequest priceTicketRequest) {
        PriceTicketEntity priceTicket = new PriceTicketEntity();
        priceTicket.setTitle(priceTicketRequest.getTitle());
        priceTicket.setFare(priceTicketRequest.getFare());
        var data = iTicketService.createPriceTicket(priceTicket);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PutMapping("")
    public ResponseEntity<?> update(@Valid @RequestBody PriceTicketRequest priceTicketRequest) {
        var data = iTicketService.updatePriceTicket(priceTicketRequest);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iTicketService.deletePriceTicket(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
