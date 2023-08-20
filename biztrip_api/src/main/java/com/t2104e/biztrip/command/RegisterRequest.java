package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.Gender;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String email;
    private String password;
    private String accessToken;
    private String phoneNumber;
    private String role;
    private String fullName;
    private Date dateOfBirth;
    private String gender;
}
