package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import jakarta.annotation.Nullable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {
    public static <T> ResponseDTO<T> ok(@Nullable T data, String message) {
        return new ResponseDTO<>(HttpStatus.OK.value(), "Success", message, data);
    }

    public static <T> ResponseDTO<T> ok(
            @Nullable T data, String message,
            int pageNumber, int perPage, long totalItems, int totalPages,
            String sortField, String sortDir) {
        return new ResponseDTO<>(
                HttpStatus.OK.value(), "Success", message,
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir,
                data
        );
    }

    public static <T> ResponseDTO<T> ok(
            @Nullable T data, String message,
            int pageNumber, int perPage, long totalItems, int totalPages) {
        return new ResponseDTO<>(
                HttpStatus.OK.value(), "Success", message,
                pageNumber, perPage, totalItems, totalPages,
                data
        );
    }

    public static <T> ResponseDTO<T> ok(
            @Nullable T data, String message,
            String sortField, String sortDir) {
        return new ResponseDTO<>(
                HttpStatus.OK.value(), "Success", message,
                sortField, sortDir,
                data
        );
    }

    public static <T> ResponseDTO<T> created(T data, String message) {
        return new ResponseDTO<>(HttpStatus.CREATED.value(), "Created", message, data);
    }

    public static <T> ResponseDTO<T> updated(String message) {
        return new ResponseDTO<>(HttpStatus.CREATED.value(), "Updated", message);
    }

    public static <T> ResponseDTO<T> noContent(String message) {
        return new ResponseDTO<>(HttpStatus.NO_CONTENT.value(), "No Content", message);
    }

    public static <T> ResponseDTO<T> conflict(String message) {
        return new ResponseDTO<>(HttpStatus.CONFLICT.value(), "Conflict", message);
    }

    public static <T> ResponseDTO<T> badRequest(String message) {
        return new ResponseDTO<>(HttpStatus.BAD_REQUEST.value(), "Bad Request", message);
    }

    public static <T> ResponseDTO<T> unAuthorized(String message) {
        return new ResponseDTO<>(HttpStatus.UNAUTHORIZED.value(), "Unauthorized", message);
    }

    public static <T> ResponseDTO<T> forbidden(String message) {
        return new ResponseDTO<>(HttpStatus.FORBIDDEN.value(), "Forbidden", message);
    }

    public static <T> ResponseDTO<T> notFound(String message) {
        return new ResponseDTO<>(HttpStatus.NOT_FOUND.value(), "Not found", message);
    }

    public static <T> ResponseDTO<T> internalError(String message) {
        return new ResponseDTO<>(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Internal server error", message);
    }
}
