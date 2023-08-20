package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.PickUpRequest;
import com.t2104e.biztrip.dto.DropOffDto;
import com.t2104e.biztrip.dto.PickUpDetailDto;
import com.t2104e.biztrip.dto.PickUpDto;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.PickUpPointEntity;
import com.t2104e.biztrip.repositories.DistanceRepository;
import com.t2104e.biztrip.repositories.LocationRepository;
import com.t2104e.biztrip.repositories.PickUpRepository;
import com.t2104e.biztrip.services.interfaces.IPickUpPointService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.validation.constraints.NotNull;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.BindingResult;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class PickUpPointService implements IPickUpPointService {

    @Autowired
    private PickUpRepository pickUpRepo;

    @Autowired
    private LocationRepository locationRepo;
    @Autowired
    private DistanceRepository distanceRepo;
    @Autowired
    protected ModelMapper modelMapper;

    @Autowired
    private ValidationHandle validationHandle;

    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

    @Override
    public ResponseDTO<?> getListPickUpPointByDistanceId(long distanceId, String sortField, String sortDir, String keyword) {
        Sort sort = Helper.sortQuery(sortField, sortDir);
        List<PickUpDto> pickUpDtoList = pickUpRepo.findByKeyword(distanceId, Objects.requireNonNullElse(keyword, ""), sort);

        return ResponseService.ok(pickUpDtoList, "Lấy danh sách điểm trả thành công.", sortField, sortDir);

    }


    @Override
    public ResponseDTO<?> save(long distanceId, PickUpRequest request, BindingResult result) {
        PickUpPointEntity model;

        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!locationRepo.existsById(request.getLocationId())) {
            return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + request.getLocationId());
        }
        if (!distanceRepo.existsById(distanceId)) {
            return ResponseService.badRequest("Không tìm thấy tuyến đường có id = " + distanceId);
        }

        long id = request.getId();
        model = new PickUpPointEntity();
        if (id == 0) {
            model.setDistanceId(distanceId);
            model.setCreatedAt(new Date());

        } else {

            model = pickUpRepo.findById(id).orElse(null);
            if (model == null) {
                return ResponseService.badRequest("Không tìm thấy điểm đón có id = " + id);
            }
        }

        model.setUpdatedAt(new Date());
        model.setLocationId(request.getLocationId());
        model.setTime(LocalTime.parse(request.getTime(), formatter));
        model.setStatus(request.getStatus());
        var data = pickUpRepo.save(model);
        return ResponseService.created(data, id == 0 ? "Tạo mới thành công" : "Cập nhật thành công");
    }


    @Transactional
    @Override
    public ResponseDTO<?> saveList(@NotNull long distanceId, @NotNull List<PickUpRequest> requests, BindingResult result) {
        List<PickUpPointEntity> pickUpPointEntityList = new ArrayList<>();
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        if (!distanceRepo.existsById(distanceId)) {
            return ResponseService.badRequest("Không tìm thấy quãng  đường có id = " + distanceId);
        }
        for (PickUpRequest pickUpRequest : requests) {
            if (!locationRepo.existsById(pickUpRequest.getLocationId())) {
                return ResponseService.badRequest("Không tìm thấy điểm đón  có id = " + pickUpRequest.getLocationId());
            }
            PickUpPointEntity model = convertDtoToEntity(pickUpRequest);
            model.setDistanceId(distanceId);
            model.setTime(LocalTime.parse(pickUpRequest.getTime(), formatter));
            model.setStatus(pickUpRequest.getStatus());
            model.setCreatedAt(new Date());
            model.setUpdatedAt(new Date());
            pickUpPointEntityList.add(model);
        }
        List<PickUpPointEntity> models = pickUpRepo.saveAll(pickUpPointEntityList);
        return ResponseService.created(models, "Thanh cong");
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<PickUpPointEntity> optional = pickUpRepo.findById(id);
        if (optional.isPresent()) {
            pickUpRepo.deleteById(id);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy điểm đón có id = " + id);
    }

    @Override
    public ResponseDTO<?> deleteByDistanceId(long distanceId) {
        pickUpRepo.deleteAllByDistanceId(distanceId);
        return ResponseService.ok(null, "Xóa thành công");
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {
        Optional<PickUpDetailDto> optional = pickUpRepo.findDetailById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy schedule id = " + id);
    }


    private PickUpPointEntity convertDtoToEntity(PickUpRequest request) {
        Converter<String, Date> stringToDateConverter = context -> {
            String dateString = context.getSource();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            try {
                return dateFormat.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
                return null;
            }
        };
        modelMapper.addConverter(stringToDateConverter);

        PickUpPointEntity model = modelMapper.map(request, PickUpPointEntity.class);
        return model;
    }

}


