package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.*;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.entities.*;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.ICoachService;
import com.t2104e.biztrip.utils.Helper;
import com.t2104e.biztrip.utils.ValidationHandle;
import jakarta.transaction.Transactional;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@Transactional
public class CoachImplService implements ICoachService {
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private ValidationHandle validationHandle;
    @Autowired
    UtilityRepository utilityRepository;
    @Autowired
    PriceTicketRepository priceTicketRepository;
    @Autowired
    SeatRepository seatRepository;
    @Autowired
    ThumbnailRepository thumbnailRepository;
    @Autowired
    DistanceImplService distanceService;
    @Autowired
    DistanceRepository distanceRepo;
    @Autowired
    LocationRepository locationRepository;
    @Autowired
    BookingTicketRepository bookingTicketRepository;
    @Autowired
    PickUpRepository pickUpRepo;
    @Autowired
    DropOffRepository dropOffRepo;
    @Autowired
    ReviewRepository reviewRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ReviewThumbnailRepository reviewThumbnailRepository;
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
    @Autowired
    protected ModelMapper modelMapper;

    @Override
    public ResponseDTO<?> getListCoach(int pageNumber, int perPage, String sortField, String sortDir, String keyword) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = coachRepository.findByKeyword(Objects.requireNonNullElse(keyword, ""), pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(page.getContent(), "lấy danh sách xe thành công.", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getDetail(long id) {

        Optional<CoachEntity> optional = coachRepository.findById(id);
        if (optional.isPresent()) {
            return ResponseService.ok(optional.get(), "lấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy lịch trình id = " + id);
    }


    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<CoachEntity> optional = coachRepository.findById(id);
        if (optional.isPresent()) {
            coachRepository.deleteById(id);
            List<DistanceEntity> distances = distanceRepo.findAllByCoachId(id);
            if (distances != null && distances.size() > 0) {
                for (DistanceEntity distance : distances) {
                    distanceService.delete(distance.getId());
                }
            }
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy xe id = " + id);
    }


    @Override
    public ResponseDTO<?> createCoach(CoachRequest request, BindingResult result) {
        try {
            CoachEntity coach = new CoachEntity();
            List<String> valid = validationHandle.validation(result);
            if (valid != null && !valid.isEmpty()) {
                return ResponseService.badRequest(valid.get(0));
            }
            if (coachRepository.existsByPlateNumber(request.getPlateNumber())) {
                return ResponseService.conflict("Đã tồn tại xe có biển số = " + request.getPlateNumber());
            }
            coach.setCreatedAt(new Date());
            coach.setUpdatedAt(new Date());
            coach.setName(request.getName());
            coach.setImagePath(request.getImagePath());
            coach.setPlateNumber(request.getPlateNumber());
            coach.setPriceFrom(request.getPriceFrom());
            coach.setTotalSeats(request.getTotalSeats());
            coach.setPriceFrom(request.getPriceFrom());
            coach.setDescription(request.getDescription());
            coach.setStatus(request.getStatus());

            // Add id utilities for coach
            if (request.getUtilities().size() > 0) {
                Set<UtilityEntity> utilities = addUtilityToList(request);
                coach.setUtilities(utilities);
            }

            // Create seat for coach
            if (request.getSeats().size() > 0) {
                Set<SeatEntity> seats = new HashSet<>();
                for (SeatRequest seatRequest : request.getSeats()) {
                    SeatEntity seat = new SeatEntity();
                    seat.setCreatedAt(new Date());
                    seat.setUpdatedAt(new Date());
                    seat.setSeatCode(seatRequest.getSeatCode());
                    seat.setType(seatRequest.getType());
                    seat.setPosition(seatRequest.getPosition());
                    seat.setTypeRow(seatRequest.getTypeRow());
                    Optional<PriceTicketEntity> optional = priceTicketRepository.findById(seatRequest.getPriceTicketId());
                    optional.ifPresent(seat::setPriceTicketId);
                    seat.setCoachId(coach);
                    seats.add(seat);
                }
                coach.setSeats(seats);
            }

            // Create thumbnail for coach
            if (request.getThumbnails().size() > 0) {
                Set<ThumbnailEntity> thumbnails = new HashSet<>();
                for (ThumbnailRequest thumbnailRequest : request.getThumbnails()) {
                    ThumbnailEntity thumbnail = new ThumbnailEntity();
                    thumbnail.setImagePath(thumbnailRequest.getImagePath());
                    thumbnail.setTitle(thumbnailRequest.getTitle());
                    thumbnail.setCreatedAt(new Date());
                    thumbnail.setUpdatedAt(new Date());

                    thumbnail.setCoachId(coach);
                    thumbnails.add(thumbnail);
                }
                coach.setThumbnails(thumbnails);
            }

            var data = coachRepository.save(coach);
            return ResponseService.created(data, "Tạo mới thành công");
        } catch (Exception e) {
            return ResponseService.internalError("");
        }
    }

    public ResponseDTO<?> updateCoach(CoachRequest coachRequest, BindingResult result) {
        List<String> valid = validationHandle.validation(result);
        if (valid != null && !valid.isEmpty()) {
            return ResponseService.badRequest(valid.get(0));
        }
        Optional<CoachEntity> optional = coachRepository.findById(coachRequest.getId());
        if (optional.isEmpty()) {
            return ResponseService.notFound("Không tìm thấy xe id = " + coachRequest.getId());
        }
        CoachEntity existingCoach = optional.get();
        String updatedPlateNumber = coachRequest.getPlateNumber();
        if (coachRepository.existsByPlateNumberAndIdNot(coachRequest.getPlateNumber(), coachRequest.getId())) {
            return ResponseService.conflict("Đã tồn tại xe có biển số = " + coachRequest.getPlateNumber());
        }

        existingCoach.setName(coachRequest.getName());
        existingCoach.setImagePath(coachRequest.getImagePath());
        existingCoach.setPlateNumber(updatedPlateNumber);
        existingCoach.setTotalSeats(coachRequest.getTotalSeats());
        existingCoach.setPriceFrom(coachRequest.getPriceFrom());
        existingCoach.setDescription(coachRequest.getDescription());
        existingCoach.setStatus(coachRequest.getStatus());
        existingCoach.setUpdatedAt(new Date());

        // Update utilities for coach
        if (coachRequest.getUtilities().size() > 0) {
            Set<UtilityEntity> utilities = addUtilityToList(coachRequest);
            existingCoach.setUtilities(utilities);
        }

        // Update seat for coach
        if (coachRequest.getSeats().size() > 0) {
            Set<SeatEntity> seats = new HashSet<>();
            List<Long> listIdSeats = new ArrayList<>();
            for (SeatRequest seatRequest : coachRequest.getSeats()) {
                Optional<SeatEntity> seat = seatRepository.findById(seatRequest.getId());
                Optional<PriceTicketEntity> priceTicket = priceTicketRepository.findById(seatRequest.getPriceTicketId());
                if (seat.isEmpty()) {
                    SeatEntity newSeat = new SeatEntity();
                    newSeat.setSeatCode(seatRequest.getSeatCode());
                    newSeat.setType(seatRequest.getType());
                    newSeat.setPosition(seatRequest.getPosition());
                    newSeat.setTypeRow(seatRequest.getTypeRow());
                    newSeat.setCreatedAt(new Date());
                    newSeat.setUpdatedAt(new Date());
                    priceTicket.ifPresent(newSeat::setPriceTicketId);
                    newSeat.setCoachId(existingCoach);

                    seats.add(newSeat);

                } else {
                    SeatEntity seatEntity = seat.get();
                    seatEntity.setUpdatedAt(new Date());
                    seatEntity.setSeatCode(seatRequest.getSeatCode());
                    seatEntity.setType(seatRequest.getType());
                    seatEntity.setPosition(seatRequest.getPosition());
                    priceTicket.ifPresent(seatEntity::setPriceTicketId);

                    seats.add(seatEntity);
                    listIdSeats.add(seatEntity.getId());
                }
            }
            seatRepository.deleteByIdNotInAndCoachId(listIdSeats, existingCoach.getId());
            existingCoach.setSeats(seats);
        }

        // Update thumbnail for coach
        if (coachRequest.getThumbnails().size() > 0) {
            Set<ThumbnailEntity> thumbnails = new HashSet<>();
            List<Long> listIdThumbnails = new ArrayList<>();
            for (ThumbnailRequest thumbnailRequest : coachRequest.getThumbnails()) {
                Optional<ThumbnailEntity> thumbnail = thumbnailRepository.findById(thumbnailRequest.getId());
                if (thumbnail.isEmpty()) {
                    ThumbnailEntity newThumbnail = new ThumbnailEntity();
                    newThumbnail.setCreatedAt(new Date());
                    newThumbnail.setUpdatedAt(new Date());
                    newThumbnail.setImagePath(thumbnailRequest.getImagePath());
                    newThumbnail.setTitle(thumbnailRequest.getTitle());
                    newThumbnail.setCoachId(existingCoach);
                    thumbnails.add(newThumbnail);
                } else {
                    ThumbnailEntity thumbnailEntity = thumbnail.get();
                    thumbnailEntity.setUpdatedAt(new Date());
                    thumbnailEntity.setImagePath(thumbnailRequest.getImagePath());
                    thumbnailEntity.setTitle(thumbnailRequest.getTitle());
                    thumbnails.add(thumbnailEntity);
                    listIdThumbnails.add(thumbnailEntity.getId());
                }
            }
            if (listIdThumbnails.size() > 0) {
                thumbnailRepository.deleteByIdNotInAndCoachId(listIdThumbnails, existingCoach.getId());
            } else {
                thumbnailRepository.deleteByCoachId(existingCoach.getId());
            }
            existingCoach.setThumbnails(thumbnails);
        }


        var data = coachRepository.save(existingCoach);
        return ResponseService.created(data, "Cập nhật thành công");
    }

    private Set<UtilityEntity> addUtilityToList(CoachRequest request) {
        Set<UtilityEntity> utilities = new HashSet<>();
        for (UtilityRequest utility : request.getUtilities()) {
            Optional<UtilityEntity> optional = utilityRepository.findById(utility.getId());
            optional.ifPresent(utilities::add);
        }
        return utilities;
    }

    @Override
    public ResponseDTO<?> getAllCoachByPickUpAndDropOff(long locationIdOffPickUp, long locationIdOffDropOff) {
        List<CoachEntity> coaches = coachRepository.getAllCoachByPickUpAnDropOff(locationIdOffPickUp, locationIdOffDropOff);
        if (!coaches.isEmpty()) {
            return ResponseService.ok(coaches, "Lấy danh sách xe thành công");
        } else {
            return ResponseService.noContent("Không có dữ liệu.");
        }
    }

    @Override
    public ResponseDTO<?> getAllCoachByPickUpTime(String time1, String time2) {
        LocalTime localTime1 = LocalTime.parse(time1, formatter);
        LocalTime localTime2 = LocalTime.parse(time2, formatter);

        List<CoachEntity> coaches = coachRepository.getListCoachByPickUpTime(localTime1, localTime2);
        if (!coaches.isEmpty()) {
            return ResponseService.ok(coaches, "Lấy danh sách xe thành công");
        }
        return ResponseService.noContent("Không có dữ liệu.");
    }

    @Override
    public ResponseDTO<?> getAllCoachByDropOffTime(String time1, String time2) {
        LocalTime localTime1 = LocalTime.parse(time1, formatter);
        LocalTime localTime2 = LocalTime.parse(time2, formatter);

        List<CoachEntity> coaches = coachRepository.getAllCoachByDropOffTime(localTime1, localTime2);

        return ResponseService.ok(coaches, "Lấy danh sách xe thành công");

    }

    @Override
    public ResponseDTO<?> searchAllCoach(Long departureId, Long destinationId, String time1, String time2, Double priceMin, Double priceMax) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        LocalTime _time1;
        LocalTime _time2;
        departureId = (departureId != null) ? departureId : -1L;
        destinationId = (destinationId != null) ? destinationId : -1L;
        time1 = (time1 != null) ? time1 : "";
        time2 = (time2 != null) ? time2 : "";
        try {
            _time1 = LocalTime.parse(time1, formatter);
            _time2 = LocalTime.parse(time2, formatter);
        } catch (Exception e) {
            _time1 = LocalTime.parse("00:00", formatter);
            _time2 = LocalTime.parse("23:59", formatter);
        }

        List<CoachEntity> coaches = coachRepository.searchCoach(departureId, destinationId, _time1, _time2, priceMin, priceMax);
        List<CoachDetailDto> coachDetailDtos = convertEntityToDto(coaches);
        for (CoachDetailDto coachDetailDto : coachDetailDtos) {
            List<DistanceDto> distanceDtos = distanceRepo.findDtoByCoachIdAndDepartureAndDestination(coachDetailDto.getId(), departureId, destinationId);
            for (DistanceDto detailDto : distanceDtos) {
                List<PickUpDto> pickUpDtoList = pickUpRepo.findAllByDistanceId(detailDto.getId());
                List<DropOffDto> dropOffDtoList = dropOffRepo.findAllByDistanceId(detailDto.getId());
                detailDto.setPickUpDtoList(pickUpDtoList);
                detailDto.setDropOffDtoList(dropOffDtoList);
            }
            coachDetailDto.setDistanceDtos(distanceDtos);
        }
        return ResponseService.ok(coachDetailDtos, "Lấy danh sách xe thành công");
    }

    @Override
    public ResponseDTO<?> getCoachByDistanceId(long distanceId) {
        CoachEntity coaches = coachRepository.findAllByDistanceId(distanceId);
        CoachDetailDto coachDetailDto = convertEntityToDto(coaches);

        List<DistanceDto> distanceDtos = distanceRepo.findDtoByCoachId(coachDetailDto.getId());
        for (DistanceDto detailDto : distanceDtos) {
            List<PickUpDto> pickUpDtoList = pickUpRepo.findAllByDistanceId(detailDto.getId());
            List<DropOffDto> dropOffDtoList = dropOffRepo.findAllByDistanceId(detailDto.getId());
            detailDto.setPickUpDtoList(pickUpDtoList);
            detailDto.setDropOffDtoList(dropOffDtoList);
        }
        coachDetailDto.setDistanceDtos(distanceDtos);

        return ResponseService.ok(coachDetailDto, "Lấy danh sách xe thành công");

    }

    private List<DistanceEntity> filterDistanceByTime(long scheduleId, String timeSlot, Long[] pickUp, Long[] dropOff, String formattedCurrentTime) {
        if (timeSlot != null && !timeSlot.isEmpty()) {
            String times = Helper.decode(timeSlot);
            if (times != null && !times.isEmpty()) {
                switch (times) {
                    case "00:00:00-06:00:00" -> {
                        Time timeAfter1 = Time.valueOf("00:00:00");
                        Time timeBefore1 = Time.valueOf("06:00:00");
                        return distanceRepo.findListDistanceByScheduleIdAndFilter(scheduleId, formattedCurrentTime != null && !formattedCurrentTime.isEmpty() && Helper.handleCheckCurrentTimeInAPeriodTime(formattedCurrentTime, "00:00:00-06:00:00") ? Time.valueOf(formattedCurrentTime) : timeAfter1, timeBefore1, pickUp, dropOff);
                    }
                    case "06:01:00-12:00:00" -> {
                        Time timeAfter2 = Time.valueOf("06:01:00");
                        Time timeBefore2 = Time.valueOf("12:00:00");
                        return distanceRepo.findListDistanceByScheduleIdAndFilter(scheduleId, formattedCurrentTime != null && !formattedCurrentTime.isEmpty() && Helper.handleCheckCurrentTimeInAPeriodTime(formattedCurrentTime, "06:01:00-12:00:00") ? Time.valueOf(formattedCurrentTime) : timeAfter2, timeBefore2, pickUp, dropOff);
                    }
                    case "12:01:00-18:00:00" -> {
                        Time timeAfter3 = Time.valueOf("12:01:00");
                        Time timeBefore3 = Time.valueOf("18:00:00");
                        return distanceRepo.findListDistanceByScheduleIdAndFilter(scheduleId, formattedCurrentTime != null && !formattedCurrentTime.isEmpty() && Helper.handleCheckCurrentTimeInAPeriodTime(formattedCurrentTime, "12:01:00-18:00:00") ? Time.valueOf(formattedCurrentTime) : timeAfter3, timeBefore3, pickUp, dropOff);
                    }
                    case "18:01:00-23:59:59" -> {
                        Time timeAfter4 = Time.valueOf("18:01:00");
                        Time timeBefore4 = Time.valueOf("23:59:59");
                        return distanceRepo.findListDistanceByScheduleIdAndFilter(scheduleId, formattedCurrentTime != null && !formattedCurrentTime.isEmpty() && Helper.handleCheckCurrentTimeInAPeriodTime(formattedCurrentTime, "18:01:00-23:59:59") ? Time.valueOf(formattedCurrentTime) : timeAfter4, timeBefore4, pickUp, dropOff);
                    }
                }
            }
        }
        Time timeAfter = Time.valueOf("00:00:00");
        Time timeBefore = Time.valueOf("23:59:59");
        return distanceRepo.findListDistanceByScheduleIdAndFilter(scheduleId, formattedCurrentTime != null && !formattedCurrentTime.isEmpty() ? Time.valueOf(formattedCurrentTime) : timeAfter, timeBefore, pickUp, dropOff);
    }

    private boolean checkAvailableSeat(String param, Set<SeatDto> seatDtoList) {
        if (param != null && !param.isEmpty()) {
            String[] typeRowArray = Helper.decode(param).split("\\|");
            int count = 0;
            for (SeatDto seatDto : seatDtoList) {
                if (seatDto.getType().equals("seat") && seatDto.getState() == null) {
                    TypeRow typeRow = seatDto.getTypeRow();
                    if (typeRow != null && Arrays.asList(typeRowArray).contains(typeRow.toString())) {
                        count++;
                    }
                }
            }
            return count > 0;
        }
        return true;
    }

    @Override
    public ResponseDTO<?> getListCoachByDistanceByScheduleAndTime(long scheduleId, long departureInSchedule, long destinationInSchedule, String date, int pageNumber, int perPage, String sortField, String sortDir, String timeSlot, double priceMin, double priceMax, long availableSeat, String typeRow, String pickUp, String dropOff, int rating) {
        List<CoachDistanceDto> coachDistanceDtoList = new ArrayList<>();
        List<DistanceEntity> distanceEntityList;
        LocalDate currentDate = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate inputDate = LocalDate.parse(date, formatter);
        String formattedCurrentTime = "";
        if (inputDate.equals(currentDate)) {
            LocalTime currentTime = LocalTime.now();
            DateTimeFormatter formatTime = DateTimeFormatter.ofPattern("HH:mm:ss");
            formattedCurrentTime = currentTime.format(formatTime);
        }
        Long[] listDepartureBySchedule = locationRepository.findAllLocationByParentIdAndScheduleId(departureInSchedule);
        Long[] listDestinationBySchedule = locationRepository.findAllLocationByParentIdAndScheduleId(destinationInSchedule);

        if (pickUp != null && !pickUp.isEmpty() && dropOff != null && !dropOff.isEmpty()) {
            distanceEntityList = filterDistanceByTime(scheduleId, timeSlot, Helper.convertStringToArray(pickUp), Helper.convertStringToArray(dropOff), formattedCurrentTime);
        } else if (dropOff != null && !dropOff.isEmpty()) {
            distanceEntityList = filterDistanceByTime(scheduleId, timeSlot, listDepartureBySchedule, Helper.convertStringToArray(dropOff), formattedCurrentTime);
        } else if (pickUp != null && !pickUp.isEmpty()) {
            distanceEntityList = filterDistanceByTime(scheduleId, timeSlot, Helper.convertStringToArray(pickUp), listDestinationBySchedule, formattedCurrentTime);
        } else {
            distanceEntityList = filterDistanceByTime(scheduleId, timeSlot, listDepartureBySchedule, listDestinationBySchedule, formattedCurrentTime);
        }
        for (DistanceEntity distance : distanceEntityList) {
            CoachDistanceDto coachDistanceDto = new CoachDistanceDto();
            coachDistanceDto.setDistanceId(distance.getId());
            coachDistanceDto.setTimeDifference(distance.getTimeDifference());
            coachDistanceDto.setStartTimeOfDistance(distance.getStartTime());
            coachDistanceDto.setEndTimeOfDistance(distance.getEndTime());

            PickUpDto defaultDeparture = new PickUpDto();
            Optional<PickUpPointEntity> optionalPickUpPointEntity = pickUpRepo.findPickUpPointEntitiesByDistanceIdAndDefaultIsTrue(distance.getId());
            optionalPickUpPointEntity.ifPresent(pickUpPointEntity -> {
                defaultDeparture.setId(pickUpPointEntity.getId());
                defaultDeparture.setTime(pickUpPointEntity.getTime());
                defaultDeparture.setStatus(pickUpPointEntity.getStatus());
                defaultDeparture.setDefault(pickUpPointEntity.isDefault());
                Optional<LocationEntity> optional = locationRepository.findById(pickUpPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    defaultDeparture.setLocationName(locationEntity.getName());
                    defaultDeparture.setAddress(locationEntity.getAddress());
                    defaultDeparture.setLocationId(locationEntity.getId());
                });
            });
            coachDistanceDto.setDefaultPickUp(defaultDeparture);

            DropOffDto defaultDestination = new DropOffDto();
            Optional<DropOffPointEntity> optionalDropOffPointEntity = dropOffRepo.findDropOffPointEntitiesByDistanceIdAndDefaultIsTrue(distance.getId());
            optionalDropOffPointEntity.ifPresent(dropOffPointEntity -> {
                defaultDestination.setId(dropOffPointEntity.getId());
                defaultDestination.setTime(dropOffPointEntity.getTime());
                defaultDestination.setStatus(dropOffPointEntity.getStatus());
                defaultDestination.setDefault(dropOffPointEntity.isDefault());
                Optional<LocationEntity> optional = locationRepository.findById(dropOffPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    defaultDestination.setLocationName(locationEntity.getName());
                    defaultDestination.setAddress(locationEntity.getAddress());
                    defaultDestination.setLocationId(locationEntity.getId());
                });
            });
            coachDistanceDto.setDefaultDropOff(defaultDestination);

            Set<PickUpDto> pickUpDtoList = new HashSet<>();
            List<PickUpPointEntity> pickUpPointEntityList = pickUpRepo.findPickUpPointEntitiesByDistanceIdOrderByTimeAsc(distance.getId());
            for (PickUpPointEntity pickUpPointEntity : pickUpPointEntityList) {
                PickUpDto pickUpDto = new PickUpDto();
                pickUpDto.setId(pickUpPointEntity.getId());
                pickUpDto.setTime(pickUpPointEntity.getTime());
                pickUpDto.setStatus(pickUpPointEntity.getStatus());
                Optional<LocationEntity> optional = locationRepository.findById(pickUpPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    pickUpDto.setLocationName(locationEntity.getName());
                    pickUpDto.setAddress(locationEntity.getAddress());
                    pickUpDto.setLocationId(locationEntity.getId());
                });

                pickUpDtoList.add(pickUpDto);
            }
            coachDistanceDto.setPickUpDtoList(pickUpDtoList);

            Set<DropOffDto> dropOffDtoList = new HashSet<>();
            List<DropOffPointEntity> dropOffPointEntityList = dropOffRepo.findDropOffPointEntitiesByDistanceIdOrderByTimeAsc(distance.getId());
            for (DropOffPointEntity dropOffPointEntity : dropOffPointEntityList) {
                DropOffDto dropOffDto = new DropOffDto();
                dropOffDto.setId(dropOffPointEntity.getId());
                dropOffDto.setTime(dropOffPointEntity.getTime());
                dropOffDto.setStatus(dropOffPointEntity.getStatus());
                Optional<LocationEntity> optional = locationRepository.findById(dropOffPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    dropOffDto.setLocationName(locationEntity.getName());
                    dropOffDto.setAddress(locationEntity.getAddress());
                    dropOffDto.setLocationId(locationEntity.getId());
                });

                dropOffDtoList.add(dropOffDto);
            }
            coachDistanceDto.setDropOffDtoList(dropOffDtoList);

            // tìm kiếm coach by coachId lấy trong distance
            Optional<CoachEntity> optionalCoachEntity = coachRepository.findCoachEntitiesByIdAndPriceAndRating(distance.getCoachId(), priceMin, priceMax, rating);
            optionalCoachEntity.ifPresent(coachEntity -> {
                coachDistanceDto.setCoachId(coachEntity.getId());
                coachDistanceDto.setName(coachEntity.getName());
                coachDistanceDto.setImagePath(coachEntity.getImagePath());
                coachDistanceDto.setPlateNumber(coachEntity.getPlateNumber());
                coachDistanceDto.setTotalSeats(coachEntity.getTotalSeats());
                coachDistanceDto.setPriceFrom(coachEntity.getPriceFrom());
                coachDistanceDto.setDescription(coachEntity.getDescription());
                coachDistanceDto.setStatus(coachEntity.getStatus());
                coachDistanceDto.setUtilities(coachEntity.getUtilities());

                Set<ThumbnailDto> thumbnailDtoList = new HashSet<>();
                for (ThumbnailEntity thumbnail : coachEntity.getThumbnails()) {
                    ThumbnailDto thumbnailDto = new ThumbnailDto();
                    thumbnailDto.setId(thumbnail.getId());
                    thumbnailDto.setImagePath(thumbnail.getImagePath());
                    thumbnailDto.setTitle(thumbnail.getTitle());
                    thumbnailDtoList.add(thumbnailDto);
                }
                coachDistanceDto.setThumbnails(thumbnailDtoList);

                List<ReviewEntity> listReviews = reviewRepository.findAllByCoachId(coachEntity.getId());
                Set<ReviewDto> reviewDtoSet = new HashSet<>();
                for (ReviewEntity review : listReviews) {
                    ReviewDto reviewDto = new ReviewDto();
                    reviewDto.setId(review.getId());
                    reviewDto.setGeneralRating(review.getGeneralRating());
                    reviewDto.setComment(review.getComment());
                    reviewDto.setBookingTicketId(review.getBookingTicketId());
                    reviewDto.setTimeToAdd(review.getTimeToAdd());
                    reviewDto.setTimeToExpire(review.getTimeToExpire());

                    Optional<UserEntity> optionalUser = userRepository.findById(review.getUserId().getId());
                    optionalUser.ifPresent(userEntity -> {
                        UserDto userDto = new UserDto();
                        userDto.setId(userEntity.getId());
                        userDto.setEmail(userEntity.getEmail());
                        userDto.setPhoneNumber(userEntity.getPhoneNumber());
                        userDto.setFullName(userEntity.getFullName());
                        userDto.setGender(userEntity.getGender());
                        userDto.setDateOfBirth(userEntity.getDateOfBirth());

                        reviewDto.setUser(userDto);
                    });

                    List<ReviewThumbnailEntity> reviewThumbnailEntityList = reviewThumbnailRepository.findAllByReviewId(review);
                    Set<ReviewThumbnailDto> reviewThumbnails = new HashSet<>();
                    for (ReviewThumbnailEntity reviewThumbnail : reviewThumbnailEntityList) {
                        ReviewThumbnailDto reviewThumbnailDto = new ReviewThumbnailDto();
                        reviewThumbnailDto.setId(reviewThumbnail.getId());
                        reviewThumbnailDto.setImagePath(reviewThumbnail.getImagePath());
                        reviewThumbnails.add(reviewThumbnailDto);
                    }
                    reviewDto.setReviewThumbnails(reviewThumbnails);

                    reviewDtoSet.add(reviewDto);
                }
                coachDistanceDto.setListReview(reviewDtoSet);

                Double avgOfSafeRating = reviewRepository.avgOfSafeRating(coachEntity);
                coachDistanceDto.setAvgOfSafeRating(avgOfSafeRating);
                Double avgOfGeneralRating = reviewRepository.avgOfGeneralRating(coachEntity);
                coachDistanceDto.setAvgOfGeneralRating(avgOfGeneralRating);
                Double avgOfComfortableRating = reviewRepository.avgOfComfortableRating(coachEntity);
                coachDistanceDto.setAvgOfComfortableRating(avgOfComfortableRating);
                Double avgOfEmployeeAttitudeRating = reviewRepository.avgOfEmployeeAttitudeRating(coachEntity);
                coachDistanceDto.setAvgOfEmployeeAttitudeRating(avgOfEmployeeAttitudeRating);
                Double avgOfFullInformationRating = reviewRepository.avgOfFullInformationRating(coachEntity);
                coachDistanceDto.setAvgOfFullInformationRating(avgOfFullInformationRating);
                Double avgOfServiceQualityRating = reviewRepository.avgOfServiceQualityRating(coachEntity);
                coachDistanceDto.setAvgOfServiceQualityRating(avgOfServiceQualityRating);
                Double avgOfVerifiedInformationRating = reviewRepository.avgOfVerifiedInformationRating(coachEntity);
                coachDistanceDto.setAvgOfVerifiedInformationRating(avgOfVerifiedInformationRating);
                int countOfReviewHaveComment = reviewRepository.countOfReviewHaveComment(coachEntity);
                coachDistanceDto.setCountOfReviewHaveComment(countOfReviewHaveComment);
                int countOfReviewHaveImage = reviewRepository.countOfReviewHaveImage(coachEntity);
                coachDistanceDto.setCountOfReviewHaveImage(countOfReviewHaveImage);
                try {
                    Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
                    List<State> states = Arrays.asList(State.Cancel, State.Used);
                    Set<SeatDto> seatDtoList = new HashSet<>();
                    long available = coachEntity.getTotalSeats();
                    for (SeatEntity seat : coachEntity.getSeats()) {
                        SeatDto seatDto = new SeatDto();
                        Optional<BookingTicketEntity> optionalBookingTicket = bookingTicketRepository.findBookingTicketByBookingTicketDetailBySeatId(seat.getId(), parsedDate, distance.getStartTime(), distance.getEndTime(), states);

                        seatDto.setId(seat.getId());
                        seatDto.setSeatCode(seat.getSeatCode());
                        seatDto.setType(seat.getType());
                        seatDto.setPosition(seat.getPosition());
                        seatDto.setPriceTicketId(seat.getPriceTicketId());
                        seatDto.setStartTimeOfDistance(distance.getStartTime());
                        seatDto.setEndTimeOfDistance(distance.getEndTime());
                        seatDto.setTypeRow(seat.getTypeRow());
                        if (optionalBookingTicket.isPresent()) {
                            if (optionalBookingTicket.get().getState() == State.Confirm || optionalBookingTicket.get().getState() == State.Paid || optionalBookingTicket.get().getState() == State.Pending) {
                                seatDto.setState(optionalBookingTicket.get().getState().toString());
                                available--;
                            }
                            int comparisonResult = parsedDate.compareTo(optionalBookingTicket.get().getDate());
                            if (comparisonResult == 0) {
                                seatDto.setDate(optionalBookingTicket.get().getDate());
                            }
                        }
                        seatDtoList.add(seatDto);
                    }
                    if (availableSeat <= available && checkAvailableSeat(typeRow, seatDtoList)) {
                        coachDistanceDto.setSeats(seatDtoList);
                        coachDistanceDto.setAvailableSeat(available);
                        coachDistanceDtoList.add(coachDistanceDto);
                    }
                } catch (ParseException e) {
                    System.out.println("Error parsing the date: " + e.getMessage());
                }
            });
        }
        final Pageable pageable;
        if (sortDir.equalsIgnoreCase("desc")) {
            pageable = PageRequest.of(pageNumber - 1, perPage, Sort.by(sortField).descending());
        } else {
            pageable = PageRequest.of(pageNumber - 1, perPage, Sort.by(sortField).ascending());
        }

        final int start = (int) pageable.getOffset();
        final int end = Math.min((start + pageable.getPageSize()), coachDistanceDtoList.size());
        Page<CoachDistanceDto> page = new PageImpl<>(coachDistanceDtoList.subList(start, end), pageable, coachDistanceDtoList.size());

        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();

        return ResponseService.ok(coachDistanceDtoList, "Lấy danh sách xe theo lộ trình thành công", pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getListSeatByCoachIdAndTime(long coachId, String startTimeOfDistance, String endTimeOfDistance, String date) {
        Optional<CoachEntity> optionalCoach = coachRepository.findById(coachId);
        Time starTime = Helper.convertStringToTime(startTimeOfDistance);
        Time endTime = Helper.convertStringToTime(endTimeOfDistance);
        Set<SeatDto> seatDtoList = new HashSet<>();
        optionalCoach.ifPresent(coach -> {
            try {
                Date parsedDate = new SimpleDateFormat("yyyy-MM-dd").parse(date);
                List<State> states = Arrays.asList(State.Cancel, State.Used);
                for (SeatEntity seat : coach.getSeats()) {
                    SeatDto seatDto = new SeatDto();
                    Optional<BookingTicketEntity> optionalBookingTicket = bookingTicketRepository.findBookingTicketByBookingTicketDetailBySeatId(seat.getId(), parsedDate, starTime, endTime, states);
                    seatDto.setId(seat.getId());
                    seatDto.setSeatCode(seat.getSeatCode());
                    seatDto.setType(seat.getType());
                    seatDto.setPosition(seat.getPosition());
                    seatDto.setPriceTicketId(seat.getPriceTicketId());
                    seatDto.setStartTimeOfDistance(starTime);
                    seatDto.setEndTimeOfDistance(endTime);
                    seatDto.setTypeRow(seat.getTypeRow());
                    if (optionalBookingTicket.isPresent()) {
                        if (optionalBookingTicket.get().getState() == State.Confirm || optionalBookingTicket.get().getState() == State.Paid || optionalBookingTicket.get().getState() == State.Pending) {
                            seatDto.setState(optionalBookingTicket.get().getState().toString());
                        }
                        int comparisonResult = parsedDate.compareTo(optionalBookingTicket.get().getDate());
                        if (comparisonResult == 0) {
                            seatDto.setDate(optionalBookingTicket.get().getDate());
                        }
                    }
                    seatDtoList.add(seatDto);
                }
            } catch (ParseException e) {
                throw new RuntimeException(e);
            }
        });
        return ResponseService.ok(seatDtoList, "Lấy danh sách ghế theo ngày thành công");
    }

    private CoachDetailDto convertEntityToDto(CoachEntity request) {
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
        CoachDetailDto model = modelMapper.map(request, CoachDetailDto.class);
        return model;
    }

    private List<CoachDetailDto> convertEntityToDto(List<CoachEntity> request) {
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
        List<CoachDetailDto> model = modelMapper.map(request, new TypeToken<List<CoachDetailDto>>() {
        }.getType());
        return model;
    }
}
