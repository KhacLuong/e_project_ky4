package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.UtilityRequest;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.services.interfaces.IUtilityService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/utilities")
public class UtilityController {
    @Autowired
    private IUtilityService iUtilityService;

    @GetMapping("")
    public ResponseEntity<?> index(@RequestParam("pageNumber") int pageNumber,
                                   @RequestParam("perPage") int perPage,
                                   @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
                                   @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
                                   @RequestParam(value = "keyword", required = false) String keyword) {
        var data = iUtilityService.getListUtility(pageNumber, perPage, sortField, sortDir, keyword);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> detail(@PathVariable(name = "id") long id) {
        var data = iUtilityService.getOneUtilityById(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PostMapping("")
    public ResponseEntity<?> create(@Valid @RequestBody UtilityRequest utilityRequest) {
        UtilityEntity utilityEntity = new UtilityEntity();
        utilityEntity.setDescription(utilityRequest.getDescription());
        utilityEntity.setTitle(utilityRequest.getTitle());
        utilityEntity.setImagePath(utilityRequest.getImagePath());
        utilityEntity.setStatus(utilityRequest.getStatus());
        var data = iUtilityService.createUtility(utilityEntity);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @PutMapping("")
    public ResponseEntity<?> update(@Valid @RequestBody UtilityRequest utilityRequest) {
        var data = iUtilityService.updateUtility(utilityRequest);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
    @DeleteMapping("")
    public ResponseEntity<?> delete(@RequestParam("id") long id) {
        var data = iUtilityService.deleteUtility(id);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
