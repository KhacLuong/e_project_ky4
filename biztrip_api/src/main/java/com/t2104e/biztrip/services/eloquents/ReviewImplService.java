package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.ReviewRequest;
import com.t2104e.biztrip.command.ReviewThumbnailRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.*;
import com.t2104e.biztrip.repositories.BookingTicketRepository;
import com.t2104e.biztrip.repositories.CoachRepository;
import com.t2104e.biztrip.repositories.ReviewRepository;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IReviewService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.util.*;

@Service
@Transactional
public class ReviewImplService implements IReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ValidationHandle validationHandle;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookingTicketRepository bookingTicketRepository;

    @Override
    public ResponseDTO<?> postCreate(ReviewRequest reviewRequest, BindingResult result) {
        ReviewEntity review = new ReviewEntity();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!bookingTicketRepository.existsBookingTicketEntitiesByCoachIdAndUserIdAndStateAndId(reviewRequest.getCoachId(), reviewRequest.getUserId(), State.Used, reviewRequest.getBookingTicketId())) {
            return ResponseService.badRequest("Không tìm thấy chuyến xe phù hợp với vé bạn đã mua");
        }
        if (reviewRepository.existsReviewEntitiesByBookingTicketId(reviewRequest.getBookingTicketId())) {
            return ResponseService.badRequest("Bạn chỉ có thể tạo một review với mỗi lần bạn đi xe");
        }
        if (reviewRequest.getReviewThumbnails().size() > 5) {
            return ResponseService.badRequest("Bạn chỉ có thể chọn tối đa 5 bức ảnh");
        }
        review.setCreatedAt(new Date());
        review.setUpdatedAt(new Date());
        Optional<UserEntity> user = userRepository.findById(reviewRequest.getUserId());
        user.ifPresent(review::setUserId);
        Optional<CoachEntity> coach = coachRepository.findById(reviewRequest.getCoachId());
        coach.ifPresent(review::setCoachId);

        review.setSafeRating(reviewRequest.getSafeRating());
        review.setFullInformationRating(reviewRequest.getFullInformationRating());
        review.setVerifiedInformationRating(reviewRequest.getVerifiedInformationRating());
        review.setComfortableRating(reviewRequest.getComfortableRating());
        review.setServiceQualityRating(reviewRequest.getServiceQualityRating());
        review.setEmployeeAttitudeRating(reviewRequest.getEmployeeAttitudeRating());
        review.setGeneralRating(reviewRequest.getGeneralRating());
        review.setComment(reviewRequest.getComment());
        review.setBookingTicketId(reviewRequest.getBookingTicketId());

        Set<ReviewThumbnailEntity> reviewThumbnailEntities = new HashSet<>();
        for (ReviewThumbnailRequest reviewThumbnailRequest : reviewRequest.getReviewThumbnails()) {
            ReviewThumbnailEntity reviewThumbnailEntity = new ReviewThumbnailEntity();
            reviewThumbnailEntity.setId(reviewThumbnailRequest.getId());
            reviewThumbnailEntity.setImagePath(reviewThumbnailRequest.getImagePath());
            reviewThumbnailEntity.setReviewId(review);
            reviewThumbnailEntity.setCreatedAt(new Date());
            reviewThumbnailEntity.setUpdatedAt(new Date());

            reviewThumbnailEntities.add(reviewThumbnailEntity);
        }
        review.setReviewThumbnails(reviewThumbnailEntities);
        var data = reviewRepository.save(review);
        return ResponseService.created(data, "Tạo mới thành công");
    }

    @Override
    public ResponseDTO<?> putUpdate(ReviewEntity review) {
        return null;
    }

    @Override
    public ResponseDTO<?> getListByUserId(long userId) {
        return null;
    }

    @Override
    public ResponseDTO<?> getListByCoachId(long coachId, int pageNumber, int perPage) {
//        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, "createdAt", "desc");
//        var page = reviewRepository.getReviewEntitiesByCoachId(coachId, pageable);
//        long totalItems = page.getTotalElements();
//        int totalPages = page.getTotalPages();
//        return ResponseService.ok(page.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages);
        return null;
    }

    @Override
    public ResponseDTO<?> getList() {
        return null;
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        return null;
    }
}
