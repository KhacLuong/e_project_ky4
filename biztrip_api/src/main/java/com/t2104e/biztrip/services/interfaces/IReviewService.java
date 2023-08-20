package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.ReviewRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.ReviewEntity;
import org.springframework.validation.BindingResult;

public interface IReviewService {
    ResponseDTO<?> postCreate(ReviewRequest reviewRequest, BindingResult result);

    ResponseDTO<?> putUpdate(ReviewEntity review);

    ResponseDTO<?> getListByUserId (long userId);

    ResponseDTO<?> getListByCoachId (long coachId, int pageNumber, int perPage);

    ResponseDTO<?> getList();

    ResponseDTO<?> getDetail(long id);

}
