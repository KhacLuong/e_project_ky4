package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.UtilityRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.CoachEntity;
import com.t2104e.biztrip.entities.UtilityEntity;
import com.t2104e.biztrip.repositories.CoachRepository;
import com.t2104e.biztrip.repositories.UtilityRepository;
import com.t2104e.biztrip.services.interfaces.IUtilityService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Transactional
public class UtilityImplService implements IUtilityService {
    @Autowired
    private UtilityRepository utilityRepository;
    @Autowired
    private CoachRepository coachRepository;

    @Override
    public ResponseDTO<?> getListUtility(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        Pageable pageable = PageRequest.of(pageNumber - 1, perPage, sort);
        var page = utilityRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "Lấy danh sách thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOneUtilityById(long id) {
        Optional<UtilityEntity> utility = utilityRepository.findById(id);
        if (utility.isPresent()) {
            return ResponseService.ok(utility.get(), "Lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy utility với ID: " + id);
    }

    @Override
    public ResponseDTO<?> deleteUtility(long id) {
        Optional<UtilityEntity> optionalUtility = utilityRepository.findById(id);
        if (optionalUtility.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy utility với ID: " + id);
        }
        UtilityEntity utility = optionalUtility.get();
        List<CoachEntity> coaches = coachRepository.findCoachesByUtility(utility);
        for (CoachEntity coach : coaches) {
            coach.getUtilities().remove(utility);
        }
        utilityRepository.delete(utility);
        return ResponseService.ok(null, "Xóa thành công");
    }

    @Override
    public ResponseDTO<?> createUtility(UtilityEntity utility) {
        utility.setCreatedAt(new Date());
        utility.setUpdatedAt(new Date());
        var data = utilityRepository.save(utility);
        return ResponseService.created(data, "Tạo thành công");
    }

    @Override
    public ResponseDTO<?> updateUtility(UtilityRequest utilityRequest) {
        Optional<UtilityEntity> optional = utilityRepository.findById(utilityRequest.getId());
        if (optional.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy tiện ích id = " + utilityRequest.getId());
        }
        UtilityEntity utility = optional.get();
        utility.setStatus(utilityRequest.getStatus());
        utility.setDescription(utilityRequest.getDescription());
        utility.setTitle(utilityRequest.getTitle());
        utility.setImagePath(utilityRequest.getImagePath());
        utility.setUpdatedAt(new Date());
        var data = utilityRepository.save(utility);
        return ResponseService.created(data,"Cập nhật thành công");
    }
}
