package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.DropOffRequest;
import com.t2104e.biztrip.dto.DropOffDetailDto;
import com.t2104e.biztrip.dto.DropOffDto;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.DropOffPointEntity;
import com.t2104e.biztrip.repositories.DistanceRepository;
import com.t2104e.biztrip.repositories.DropOffRepository;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.services.interfaces.IDropOffPointService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service

public class DropOffPointService implements IDropOffPointService {

    @Autowired
    private DropOffRepository dropOffRepo;

    @Autowired
    private DistanceRepository distanceRepo;

    @Autowired
    private LocationRepository locationRepo;
    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");


    @Override
    public ResponseDTO<?> getListDropOffPointByDistanceId(long distanceId, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<DropOffDto> dropOffDtos = dropOffRepo.findByKeyword(distanceId, Objects.requireNonNullElse(keyword, ""), sort);

        return ResponseService.ok(dropOffDtos, "Lấy danh sách điểm trả thành công.", sortField, sortDir);

    }

    @Override
    public ResponseDTO<?> save(long distanceId, DropOffRequest request, BindingResult result) {
        DropOffPointEntity model = new DropOffPointEntity();

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!locationRepo.existsById(request.getLocationId())) {
            return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + request.getLocationId());
        }
        if (!distanceRepo.existsById(distanceId)) {
            return ResponseService.badRequest("Không tìm thấy quãng đường  có id = " + distanceId);
        }

        long id = request.getId();
        if (id == 0) {
            model.setDistanceId(distanceId);
            model.setCreatedAt(new Date());
        } else {
            model = dropOffRepo.findById(id).orElse(null);
            if (model == null) {
                return ResponseService.badRequest("Không tìm thấy điểm đón có id = " + id);
            }

        }
        model.setLocationId(request.getLocationId());
        model.setTime(LocalTime.parse(request.getTime(), formatter));
        model.setStatus(request.getStatus());
        model.setUpdatedAt(new Date());
        var data = dropOffRepo.save(model);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<DropOffPointEntity> optional = dropOffRepo.findById(id);
        if (optional.isPresent()) {
            dropOffRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy điểm đón có id = " + id);
    }

    @Override
    public ResponseDTO<?> deleteByDistanceId(long distanceId) {
        dropOffRepo.deleteAllByDistanceId(distanceId);
        return ResponseService.ok(null, "Xóa thành công");
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        Optional<DropOffDetailDto> optional = dropOffRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }

    @Override
    public ResponseDTO<?> saveList(long scheduleId, List<DropOffRequest> requests, BindingResult result) {
        List<DropOffPointEntity> dropOffPointEntityList = new ArrayList<>();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!distanceRepo.existsById(scheduleId)) {
            return ResponseService.badRequest("Không tìm thấy quãng đường có id = " + scheduleId);
        }
        for (DropOffRequest dropOffRequest : requests) {
            if (!locationRepo.existsById(dropOffRequest.getLocationId())) {
                return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + dropOffRequest.getLocationId());
            }
            DropOffPointEntity model = new DropOffPointEntity();
            model.setLocationId(dropOffRequest.getLocationId());
            model.setTime(LocalTime.parse(dropOffRequest.getTime(), formatter));
            model.setStatus(model.getStatus());
            model.setDistanceId(scheduleId);
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            dropOffPointEntityList.add(model);
        }
        List<DropOffPointEntity> models = dropOffRepo.saveAll(dropOffPointEntityList);
        return ResponseService.created(models, "Thanh cong");
    }
}
