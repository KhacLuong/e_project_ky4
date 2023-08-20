package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.TestimonialEntity;
import com.t2104e.biztrip.repositories.TestimonialRepository;
import com.t2104e.biztrip.services.interfaces.ITestimonialService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class TestimonialImplService implements ITestimonialService {
    @Autowired
    private TestimonialRepository testimonialRepository;
    @Override
    public ResponseDTO<?> getListTestimonial(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = testimonialRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOneTestimonialById(long id) {
        Optional<TestimonialEntity> op = testimonialRepository.findById(id);
        if (op.isPresent()) {
            return ResponseService.ok(op.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> deleteTestimonial(long id) {
        Optional<TestimonialEntity> op = testimonialRepository.findById(id);
        if (op.isPresent()) {
            testimonialRepository.delete(op.get());
            return ResponseService.ok(null, "Xoa thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> saveTestimonial(TestimonialEntity testimonial) {
        long id = testimonial.getId();
        if (id == 0) {
            testimonial.setCreatedAt(new Date());
        }
        testimonial.setUpdatedAt(new Date());
        var data = testimonialRepository.save(testimonial);
        return ResponseService.created(data, id == 0 ? "Tao thanh cong" : "Cap nhat thanh cong");
    }
}
