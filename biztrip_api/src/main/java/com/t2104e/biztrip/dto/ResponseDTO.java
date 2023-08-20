package com.t2104e.biztrip.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO<T> {
    private int code;
    private String status;
    private String message;
    private Integer pageNumber;
    private Integer perPage;
    private Long totalItems;
    private Integer totalPages;
    private String sortField;
    private String sortDir;
    private T data;

    public ResponseDTO(int code, String status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }

    public ResponseDTO(int code, String status, String message, T data) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.data = data;
    }

    public ResponseDTO(int code, String status, String message, String sortField, String sortDir, T data) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.sortField = sortField;
        this.sortDir = sortDir;
        this.data = data;
    }

    public ResponseDTO(int code, String status, String message, int pageNumber, int perPage, long totalItems, int totalPages, T data) {
        this.code = code;
        this.status = status;
        this.message = message;
        this.pageNumber = pageNumber;
        this.perPage = perPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
        this.data = data;
    }
}
