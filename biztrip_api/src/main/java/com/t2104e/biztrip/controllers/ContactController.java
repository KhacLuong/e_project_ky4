package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.entities.ContactEntity;
import com.t2104e.biztrip.services.interfaces.IContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/contacts")
public class ContactController {
    @Autowired
    IContactService iContactService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam(value = "pageNumber") int pageNumber, @RequestParam(value = "perPage") int perPage, @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField, @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir, @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iContactService.getListContact(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iContactService.deleteContact(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody ContactEntity contact) {
        var data = iContactService.createContact(contact);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PutMapping("")
    public ResponseEntity<?> update(@RequestParam("id") long id) {
        var data = iContactService.updateContact(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
