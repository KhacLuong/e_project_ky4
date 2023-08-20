package com.t2104e.biztrip.controllers;

import com.t2104e.biztrip.command.ChangePasswordRequest;
import com.t2104e.biztrip.command.ResetPasswordRequest;
import com.t2104e.biztrip.command.UpdateUserInfoRequest;
import com.t2104e.biztrip.services.interfaces.IUserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final IUserService iuserService;

    @GetMapping("")
    public ResponseEntity<?> index(
            @RequestParam(value = "pageNumber") int pageNumber,
            @RequestParam(value = "perPage") int perPage,
            @RequestParam(value = "sortField", defaultValue = "updatedAt") String sortField,
            @RequestParam(value = "sortDir", defaultValue = "desc") String sortDir,
            @RequestParam(value = "keyword", required = false) String keyword
    ) {
        if (keyword != null && !keyword.isEmpty())
        {
            var data = iuserService.getListUsersByKeyword(pageNumber, perPage, sortField, sortDir, keyword);
            return new ResponseEntity<>(
                    data,
                    HttpStatusCode.valueOf(data.getCode())
            );
        }
        var data = iuserService.getListUsers(pageNumber, perPage, sortField, sortDir);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping(value = "/verify")
    public ResponseEntity<?> verify(@RequestParam(value = "token") String token){
        var data = iuserService.verifyAccount(token);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping(value = "/forget-password")
    public ResponseEntity<?> forgetPassword(@RequestParam(value = "email") String email){
        var data = iuserService.forgetPassword(email);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PostMapping(value = "/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request){
        var data = iuserService.resetPassword(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping(value = "/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest request){
        var data = iuserService.changePassword(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @PutMapping(value = "/update-info")
    public ResponseEntity<?> updateInfo(@RequestBody UpdateUserInfoRequest request){
        var data = iuserService.updateUserInfo(request);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @GetMapping(value = "/get-user-by-email")
    public ResponseEntity<?> getUserByEmail(@RequestParam String email) {
        var data = iuserService.getUserByEmail(email);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
    @GetMapping(value = "/{id}")
    public ResponseEntity<?> getUserById(@PathVariable(name = "id") long id) {
        var data = iuserService.getUserById(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }

    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<?> deleteUser(@RequestParam(value = "id") long id){
        var data = iuserService.deleteUser(id);
        return new ResponseEntity<>(
                data,
                HttpStatusCode.valueOf(data.getCode())
        );
    }
}
