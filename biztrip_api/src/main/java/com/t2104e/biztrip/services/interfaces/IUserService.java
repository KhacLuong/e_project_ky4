package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.ChangePasswordRequest;
import com.t2104e.biztrip.command.ResetPasswordRequest;
import com.t2104e.biztrip.command.UpdateUserInfoRequest;
import com.t2104e.biztrip.dto.ResponseDTO;

public interface IUserService {
    ResponseDTO<?> getListUsers(int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDTO<?> getListUsersByKeyword(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    ResponseDTO<?> verifyAccount(String token);
    ResponseDTO<?> forgetPassword(String token);
    ResponseDTO<?> resetPassword(ResetPasswordRequest request);
    ResponseDTO<?> changePassword(ChangePasswordRequest request);
    ResponseDTO<?> updateUserInfo(UpdateUserInfoRequest request);
    ResponseDTO<?> getUserByEmail(String email);
    ResponseDTO<?> getUserById(long id);
    ResponseDTO<?> deleteUser(long id);
}
