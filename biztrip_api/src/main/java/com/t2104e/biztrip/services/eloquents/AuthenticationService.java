package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.AuthenticationRequest;
import com.t2104e.biztrip.command.RegisterRequest;
import com.t2104e.biztrip.dto.AuthenticationResponse;
import com.t2104e.biztrip.dto.GoogleTokenInfoResponse;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.Gender;
import com.t2104e.biztrip.entities.Role;
import com.t2104e.biztrip.entities.UserEntity;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IEmailService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final IEmailService eMailService;
    private final RestTemplate restTemplate;

    public ResponseDTO<?> register(RegisterRequest request) {
        if (request.getEmail() != null && request.getPassword() != null
                && !request.getEmail().isEmpty() && !request.getPassword().isEmpty()) {
            return email_register(request);
        } else if (request.getAccessToken() != null && !request.getAccessToken().isEmpty()) {
            return google_register(request);
        } else if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            return phone_register(request);
        }
        return ResponseService.conflict("Request sai.");
    }

    private ResponseDTO<?> email_register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }

        var user = UserEntity.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(createRandomToken()))
                .phoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber() : "")
                .role(request.getRole() != null ? Role.valueOf(request.getRole()) : Role.USER)
                .verifyAt(new Date())
                .createdAt(new Date())
                .googleAccount(false)
                .fullName(request.getFullName() != null ? request.getFullName() : "")
                .dateOfBirth(request.getDateOfBirth() != null ? request.getDateOfBirth() : null)
                .gender(request.getGender() != null && isValidGender(request.getGender()) ? Gender.valueOf(request.getGender()) : Gender.Other)
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .user(savedUser)
                .build();
        eMailService.sendSimpleMessage(
                user.getEmail(),
                "Đăng ký tài khoản",
                "Cảm ơn bạn đã đăng ký tài khoản tại Biztrip." +
                        "Chúc bạn có thượng lộ bình an."
        );
        return ResponseService.created(data, "Tạo tài khoản mới thành công. Kiểm tra email để xác thực tài khoản.");
    }
    private ResponseDTO<?> google_register(RegisterRequest request) {
        var accessToken = request.getAccessToken();
        GoogleTokenInfoResponse googleResponse;
        if (accessToken.startsWith("ya29")) {
            try {
                googleResponse = restTemplate.getForObject(
                        "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken,
                        GoogleTokenInfoResponse.class
                );
            } catch (RestClientException exception) {
                return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
            }
        } else {
            try {
                googleResponse = restTemplate.getForObject(
                        "https://oauth2.googleapis.com/tokeninfo?id_token=" + accessToken,
                        GoogleTokenInfoResponse.class
                );
            } catch (RestClientException exception) {
                return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
            }
        }
        if (googleResponse == null) {
            return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
        }
        var email = googleResponse.getEmail();
        if (email == null) {
            return ResponseService.notFound("Không có thông tin email.");
        }
        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với email này. Hãy chọn email khác.");
        }

        var user = UserEntity.builder()
                .email(email)
                .password(passwordEncoder.encode(createRandomToken()))
                .phoneNumber(request.getPhoneNumber() != null ? request.getPhoneNumber() : "")
                .role(request.getRole() != null ? Role.valueOf(request.getRole()) : Role.USER)
                .createdAt(new Date())
                .googleAccount(true)
                .verifyAt(Boolean.TRUE.toString().equals(googleResponse.getEmail_verified()) ? new Date() : null)
                .fullName(request.getFullName() != null ? request.getFullName() : "")
                .dateOfBirth(request.getDateOfBirth() != null ? request.getDateOfBirth() : null)
                .gender(request.getGender() != null && isValidGender(request.getGender()) ? Gender.valueOf(request.getGender()) : Gender.Other)
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .user(savedUser)
                .build();
        eMailService.sendSimpleMessage(
                user.getEmail(),
                "Đăng ký tài khoản",
                "Cảm ơn bạn đã đăng ký tài khoản tại Biztrip." +
                        "Chúc bạn có thượng lộ bình an."
        );
        return ResponseService.created(data, "Tạo tài khoản mới thành công. Kiểm tra email để xác thực tài khoản.");
    }
    private ResponseDTO<?> phone_register(RegisterRequest request) {
        if (userRepository.findByPhoneNumber(request.getPhoneNumber()).isPresent()) {
            return ResponseService.conflict("Đã tồn tại tài khoản với số điện thoại này. Hãy chọn số điện thoại khác.");
        }

        var user = UserEntity.builder()
                .password(passwordEncoder.encode(createRandomToken()))
                .phoneNumber(request.getPhoneNumber())
                .role(request.getRole() != null ? Role.valueOf(request.getRole()) : Role.USER)
                .createdAt(new Date())
                .googleAccount(false)
                .verifyAt(new Date())
                .fullName(request.getFullName() != null ? request.getFullName() : "")
                .dateOfBirth(request.getDateOfBirth() != null ? request.getDateOfBirth() : null)
                .gender(request.getGender() != null && isValidGender(request.getGender()) ? Gender.valueOf(request.getGender()) : Gender.Other)
                .build();
        var savedUser = userRepository.save(user);
        var data = AuthenticationResponse.builder()
                .user(savedUser)
                .build();

        return ResponseService.created(data, "Tạo tài khoản mới thành công. Kiểm tra email để xác thực tài khoản.");
    }

    public ResponseDTO<?> authenticate(AuthenticationRequest request) {
        if (request.getEmail() != null && request.getPassword() != null
                && !request.getEmail().isEmpty() && !request.getPassword().isEmpty()) {
            return email_authenticate(request);
        } else if (request.getAccessToken() != null && !request.getAccessToken().isEmpty()) {
            return google_authenticate(request);
        } else if (request.getPhoneNumber() != null && !request.getPhoneNumber().isEmpty()) {
            return phone_authenticate(request);
        }
        return ResponseService.conflict("Request sai.");
    }
    private ResponseDTO<?> email_authenticate(AuthenticationRequest request) {
        try{
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException e) {
            return ResponseService.notFound("Không tìm được tài khoản với thông tin email và password cung cấp.");
        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        var data = AuthenticationResponse.builder()
                .user(user)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.ok(data, "Đăng nhập thành công.");
    }
    private ResponseDTO<?> google_authenticate(AuthenticationRequest request) {
        var accessToken = request.getAccessToken();
        GoogleTokenInfoResponse googleResponse;
        if (accessToken.startsWith("ya29")) {
            try {
                googleResponse = restTemplate.getForObject(
                        "https://oauth2.googleapis.com/tokeninfo?access_token=" + accessToken,
                        GoogleTokenInfoResponse.class
                );
            } catch (RestClientException exception) {
                return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
            }
        } else {
            try {
                googleResponse = restTemplate.getForObject(
                        "https://oauth2.googleapis.com/tokeninfo?id_token=" + accessToken,
                        GoogleTokenInfoResponse.class
                );
            } catch (RestClientException exception) {
                return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
            }
        }
        if (googleResponse == null) {
            return ResponseService.badRequest("Token lỗi hoặc hết hạn.");
        }
        var email = googleResponse.getEmail();
        if (email == null) {
            return ResponseService.notFound("Không có thông tin email.");
        }
        var userByEmail = userRepository.findByEmail(email);
        if (userByEmail.isEmpty()) {
            return ResponseService.notFound("Không tìm được tài khoản với thông tin google email cung cấp.");
        }
        var user = userByEmail.get();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        var data = AuthenticationResponse.builder()
                .user(user)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.ok(data, "Đăng nhập thành công.");
    }
    private ResponseDTO<?> phone_authenticate(AuthenticationRequest request) {
        var userByPhoneNumber = userRepository.findByPhoneNumber(request.getPhoneNumber());
        if (userByPhoneNumber.isEmpty()) {
            return ResponseService.notFound("Không tìm được tài khoản với thông tin số điện thoại cung cấp.");
        }
        var user = userByPhoneNumber.get();
        var jwtToken = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, refreshToken);
        var data = AuthenticationResponse.builder()
                .user(user)
                .accessToken(jwtToken)
                .refreshToken(refreshToken)
                .build();
        return ResponseService.ok(data, "Đăng nhập thành công.");
    }

    private void saveUserToken(UserEntity user, String refreshToken) {
        user.setRefreshToken(refreshToken);
        user.setTokenRevoked(false);
        user.setTokenExpired(false);
        userRepository.save(user);
    }

    private void revokeAllUserTokens(UserEntity user) {
        user.setTokenRevoked(true);
        user.setTokenExpired(true);
        userRepository.save(user);
    }

    private boolean isValidGender(String requestGender) {
        for (Gender gender : Gender.values()) {
            if (gender.name().equalsIgnoreCase(requestGender)) {
                return true;
            }
        }
        return false;
    }

    public ResponseDTO<?> refreshToken(
            HttpServletRequest request
    ) throws IOException {
        final String refreshTokenHeader = request.getHeader("REFRESH-TOKEN");
        final String refreshToken;
        final String userEmail;
        if (refreshTokenHeader == null) {
            return ResponseService.unAuthorized("Không có Refresh Token");
        }
        refreshToken = refreshTokenHeader;
        userEmail = jwtService.extractUsername(refreshToken);
        if (userEmail != null) {
            var user = this.userRepository.findByEmail(userEmail).orElseThrow();
            if (user.getRefreshToken().equals(refreshToken)) {
                var accessToken = jwtService.generateToken(user);
                var newRefreshToken = jwtService.generateRefreshToken(user);
                saveUserToken(user, newRefreshToken);
                var data = AuthenticationResponse.builder()
                        .user(user)
                        .accessToken(accessToken)
                        .refreshToken(newRefreshToken)
                        .build();
                return ResponseService.ok(data, "JWT được tạo mới thành công.");
            } else {
                ResponseService.unAuthorized("Token đã hết hạn.");
            }
        }
        return ResponseService.notFound("Không tìm thấy tài khoản tồn tại với email lấy từ refresh token.");
    }

    public ResponseDTO<?> logout(HttpServletRequest request) {
        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null ||!authHeader.startsWith("Bearer ")) {
            return ResponseService.unAuthorized("Không có token hoặc token không bắt đầu với Bearer.");
        }
        var authToken = authHeader.substring(7);
        var userEmail = jwtService.extractUsername(authToken);
        if (userEmail == null) {
            return ResponseService.conflict("Token không đúng.");
        }
        var optionalUser = userRepository.findByEmail(userEmail);
        if (optionalUser.isEmpty()) {
            return ResponseService.notFound("Tài khoản không tồn tại.");
        }
        var user = optionalUser.get();
        user.setRefreshToken(null);
        user.setTokenExpired(true);
        user.setTokenRevoked(true);
        userRepository.save(user);

        SecurityContextHolder.clearContext();
        return ResponseService.ok(null,"Đăng xuất thành công.");
    }

    private String createRandomToken() {
        byte[] randomBytes = new byte[32];
        SecureRandom secureRandom = new SecureRandom();
        secureRandom.nextBytes(randomBytes);
        String token = Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);

        if (userRepository.existsByVerifyToken(token) || userRepository.existsByPasswordResetToken(token)) {
            return createRandomToken();
        }
        return token;
    }

}
