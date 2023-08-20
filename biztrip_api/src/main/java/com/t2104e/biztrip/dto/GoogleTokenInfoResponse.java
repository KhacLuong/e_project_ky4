package com.t2104e.biztrip.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class GoogleTokenInfoResponse {
    private String iss;
    private String azp;
    private String aud;
    private String sub;
    private String scope;
    private String exp;
    private String expires_in;
    private String email;
    private String email_verified;
    private String access_type;
    private String at_hash;
    private String name;
    private String given_name;
    private String family_name;
    private String picture;
    private String locale;
    private String iat;
    private String alg;
    private String kid;
    private String typ;
}
