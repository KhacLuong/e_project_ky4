package com.t2104e.biztrip.command;

import com.t2104e.biztrip.entities.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserInfoRequest {
    private long id;
    private String fullName;
    private Date dateOfBirth;
    private String phoneNumber;
    private String gender;
    private String email;
}
