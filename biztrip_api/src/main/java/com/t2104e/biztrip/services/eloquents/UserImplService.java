package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.ChangePasswordRequest;
import com.t2104e.biztrip.command.ResetPasswordRequest;
import com.t2104e.biztrip.command.UpdateUserInfoRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.Gender;
import com.t2104e.biztrip.entities.UserEntity;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IUserService;
import com.t2104e.biztrip.utils.Helper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.Duration;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserImplService implements IUserService {
    private final UserRepository userRepository;
    private final EmailImplService eMailImplService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public ResponseDTO<?> getListUsers(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = userRepository.findAll(pageable);
        if (data.isEmpty()){
            return ResponseService.noContent("Không có tài khoản.");
        }
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseService.ok(data.getContent(), "Lấy danh sách tài khoản thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getListUsersByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var data = userRepository.findByKeyword(keyword, pageable);
        if (data.isEmpty()){
            return ResponseService.noContent("Không tìm thấy tài khoản với từ khóa " + keyword);
        }
        long totalItems = data.getTotalElements();
        int totalPages = data.getTotalPages();
        return ResponseService.ok(data.getContent(), "Lấy danh sách tài khoản với từ khóa " + keyword + " thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> verifyAccount(String token){
        var data = userRepository.findByVerifyToken(token);
        if (data.isEmpty()){
            return ResponseService.noContent("Token không hợp lệ.");
        }
        var user = data.get();
        user.setVerifyAt(new Date());
        userRepository.save(user);
        return ResponseService.ok(null, "Tài khoản đã được xác thực thành công");
    }

    @Override
    public ResponseDTO<?> forgetPassword(String email){
        if (email.isEmpty()){
            return ResponseService.badRequest("Hãy nhập email.");
        }
        var data = userRepository.findByEmail(email);
        if (data.isEmpty()){
            return ResponseService.notFound("Không có tài khoản nào trùng với email cung cấp.");
        }
        var user = data.get();
        user.setPasswordResetToken(createRandomToken());
        user.setPasswordResetExpired(Date.from(new Date().toInstant().plus(Duration.ofDays(1))));
        userRepository.save(user);
        eMailImplService.sendSimpleMessage(
                email,
                "Tạo lại mật khẩu",
                "Bấm vào đường dẫn này:\n" +
                        "localhost:9090/api/v1/users/reset-password?token=" + user.getPasswordResetToken()
        );
        return ResponseService.ok(null, "Kiểm tra email để tạo lại mật khẩu.");
    }

    @Override
    public ResponseDTO<?> resetPassword(ResetPasswordRequest request){
        var data = userRepository.findByPasswordResetToken(request.getToken());
        if (data.isEmpty()){
            return ResponseService.notFound("Token không hợp lệ.");
        }
        var user = data.get();
        if (user.getPasswordResetExpired().toInstant().isBefore(new Date().toInstant())){
            return ResponseService.conflict("Token tạo mới mật khẩu đã hết hạn");
        }
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPasswordResetToken(null);
        user.setPasswordResetExpired(null);
        userRepository.save(user);
        return ResponseService.ok(null, "Tạo mới mật khẩu thành công.");
    }

    @Override
    public ResponseDTO<?> changePassword(ChangePasswordRequest request){
        var data = userRepository.findById(request.getId());
        if (data.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy tài khoản.");
        }
        var user = data.get();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword())){
            return ResponseService.conflict("Mật khẩu cũ không đúng.");
        }
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        return ResponseService.ok(null, "Đổi mật khẩu thành công.");
    }

    @Override
    public ResponseDTO<?> updateUserInfo(UpdateUserInfoRequest request) {
        Optional<UserEntity> data = userRepository.findById(request.getId());
        if (data.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy tài khoản.");
        }
        var user = data.get();
        user.setFullName(request.getFullName());
        user.setDateOfBirth(request.getDateOfBirth());
        user.setEmail(request.getEmail());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setGender(isValidGender(request.getGender()) ? Gender.valueOf(request.getGender()) : Gender.Other);
        user.setUpdatedAt(new Date());
        userRepository.save(user);
        return ResponseService.ok(user, "Thay đổi thông tin tài khoản thành công.");
    }

    @Override
    public ResponseDTO<?> getUserByEmail(String email) {
        Optional<UserEntity> optional = userRepository.findByEmail(email);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "Lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy tài khoản");
    }

    @Override
    public ResponseDTO<?> getUserById(long id) {
        Optional<UserEntity> optional = userRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "Lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy tài khoản");
    }

    @Override
    public ResponseDTO<?> deleteUser(long id) {
        var data = userRepository.findById(id);
        if (data.isEmpty()){
            return ResponseService.noContent("No account found.");
        }
        var user = data.get();
        userRepository.delete(user);
        return ResponseService.ok(user, "Delete user successfully.");
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

    private boolean isValidGender(String requestGender) {
        for (Gender gender : Gender.values()) {
            if (gender.name().equalsIgnoreCase(requestGender)) {
                return true;
            }
        }
        return false;
    }
}
