package com.t2104e.biztrip.dto;

import com.t2104e.biztrip.entities.Gender;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {
    private long id;
    private String email;
    private String phoneNumber;
    public String fullName;
    public Gender gender;
    public Date dateOfBirth;
}
