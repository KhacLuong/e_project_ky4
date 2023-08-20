package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.TestimonialEntity;

public interface ITestimonialService {
    public ResponseDTO<?> getListTestimonial(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    public ResponseDTO<?> getOneTestimonialById(long id);
    public ResponseDTO<?> deleteTestimonial(long id);
    public ResponseDTO<?> saveTestimonial(TestimonialEntity testimonial);
}
