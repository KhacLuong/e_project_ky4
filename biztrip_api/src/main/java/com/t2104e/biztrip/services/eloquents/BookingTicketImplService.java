package com.t2104e.biztrip.services.eloquents;

import com.t2104e.biztrip.command.BookingTicketDetailRequest;
import com.t2104e.biztrip.command.BookingTicketRequest;
import com.t2104e.biztrip.dto.*;
import com.t2104e.biztrip.entities.*;
import com.t2104e.biztrip.repositories.*;
import com.t2104e.biztrip.services.interfaces.IBookingTicketService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.security.SecureRandom;
import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class BookingTicketImplService implements IBookingTicketService {
    @Autowired
    private final BookingTicketRepository bookingTicketRepository;
    @Autowired
    private final DistanceRepository distanceRepository;
    @Autowired
    private final LocationRepository locationRepository;
    @Autowired
    private PickUpRepository pickUpRepo;
    @Autowired
    private DropOffRepository dropOffRepo;
    @Autowired
    private ScheduleRepository scheduleRepository;
    @Autowired
    private CoachRepository coachRepository;
    @Autowired
    private SeatRepository seatRepository;
    @Override
    public ResponseDTO<?> booking(BookingTicketRequest request) {
        try {
            Date currentTime = new Date();
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(currentTime);
            calendar.add(Calendar.MINUTE, 15);
            Date timeToExpire = calendar.getTime();

            List<State> states = Arrays.asList(State.Cancel, State.Used);
            List<Long> listSeatId = new ArrayList<>();
            for (BookingTicketDetailRequest bookingTicketDetailRequest : request.getBookingTicketDetails()) {
                listSeatId.add(bookingTicketDetailRequest.getSeatId());
            }

            Optional<BookingTicketEntity> findBookingBeforeCreate = bookingTicketRepository.findBookingTicketEntitiesExists(request.getDate(), listSeatId, request.getDistanceId(), states, currentTime);

            if (findBookingBeforeCreate.isPresent()) {
                return ResponseService.conflict("Vị trí bạn chọn đã có người đặt. Vui lòng chọn vị trí khác");
            }
            BookingTicketEntity bookingTicket = new BookingTicketEntity();
            bookingTicket.setCreatedAt(currentTime);
            bookingTicket.setUpdatedAt(currentTime);
            bookingTicket.setReservationCode(Helper.reservationCode());
            bookingTicket.setPrice(request.getPrice());
            bookingTicket.setDate(request.getDate());
            bookingTicket.setDistanceId(request.getDistanceId());
            bookingTicket.setPickUpPointId(request.getPickUpPointId());
            bookingTicket.setDropOffPointId(request.getDropOffPointId());
            bookingTicket.setUserId(request.getUserId());
            bookingTicket.setState(State.Pending);
            bookingTicket.setCoachId(request.getCoachId());
            bookingTicket.setHelpBooking(request.getHelpBooking());
            bookingTicket.setPassengerName(request.getPassengerName());
            bookingTicket.setPassengerEmail(request.getPassengerEmail());
            bookingTicket.setPassengerPhoneNumber(request.getPassengerPhoneNumber());
            bookingTicket.setTimeToAdd(currentTime);
            bookingTicket.setTimeToExpire(timeToExpire);

            Set<BookingTicketDetailEntity> bookingTicketDetailEntities = new HashSet<>();
            for (BookingTicketDetailRequest bookingTicketDetailRequest : request.getBookingTicketDetails()) {
                BookingTicketDetailEntity bookingTicketDetail = new BookingTicketDetailEntity();
                bookingTicketDetail.setBookingTicketId(bookingTicket);
                bookingTicketDetail.setSeatId(bookingTicketDetailRequest.getSeatId());
                bookingTicketDetail.setDate(request.getDate());
                bookingTicketDetail.setStartTimeOfDistance(request.getStartTimeOfDistance());
                bookingTicketDetail.setEndTimeDistance(request.getEndTimeOfDistance());
                bookingTicketDetailEntities.add(bookingTicketDetail);
            }
            bookingTicket.setBookingTicketDetails(bookingTicketDetailEntities);
            var savedBookingTicket = bookingTicketRepository.save(bookingTicket);

            return ResponseService.created(savedBookingTicket, "Tạo vé thành công");
        } catch (Exception e) {
            return ResponseService.internalError(e.getMessage());
        }
    }

    @Override
    public ResponseDTO<?> update(long id, BookingTicketRequest request) {
        var bookingTicket = bookingTicketRepository.findById(id).orElseThrow();
        bookingTicket.setPickUpPointId(request.getPickUpPointId());
        bookingTicket.setDropOffPointId(request.getDropOffPointId());
        bookingTicket.setHelpBooking(request.getHelpBooking());
        bookingTicket.setPassengerName(request.getPassengerName());
        bookingTicket.setPassengerEmail(request.getPassengerEmail());
        bookingTicket.setPassengerPhoneNumber(request.getPassengerPhoneNumber());
        bookingTicket.setUpdatedAt(new Date());
        bookingTicketRepository.save(bookingTicket);
        return ResponseService.ok(bookingTicket, "Cập nhật thông tin thành công");
    }

    @Override
    public ResponseDTO<?> cancel(long id) {
        var bookingTicket = bookingTicketRepository.findById(id).orElseThrow();
        bookingTicket.setState(State.Cancel);
        bookingTicket.setTimeToExpire(null);
        bookingTicket.setUpdatedAt(new Date());
        bookingTicketRepository.save(bookingTicket);
        return ResponseService.ok(bookingTicket, "Hủy vé thành công");
    }

    @Override
    public ResponseDTO<?> delete(long id) {
        Optional<BookingTicketEntity> optional = bookingTicketRepository.findById(id);
        if (optional.isPresent()) {
            BookingTicketEntity bookingTicket = optional.get();
            bookingTicketRepository.delete(bookingTicket);
            return ResponseService.ok(null, "Xóa thành công");
        }
        return ResponseService.notFound("Không tìm thấy vé đặt với ID: " + id);
    }

    @Override
    public List<BookingTicketEntity> findExpireBookingTicket() {
        Date currentTime = new Date();
        return bookingTicketRepository.findByTimeToExpireBefore(currentTime);
    }

    @Override
    public ResponseDTO<?> getById(long id) {
        Optional<BookingTicketEntity> data = bookingTicketRepository.findById(id);
        BookingTicketResponse bookingTicketResponse = returnBookingTicket(data);
        if (bookingTicketResponse != null) {
            return ResponseService.ok(bookingTicketResponse, "Tìm thấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy vé với ID: " + id);
    }

    @Override
    public ResponseDTO<?> getByUserId(long userId) {
        List<BookingTicketEntity> data = bookingTicketRepository.findByUserId(userId);
        if (data.size() != 0) {
            return ResponseService.ok(data, "Lấy danh sách vé thành công");
        }
        return ResponseService.notFound("Không tìm thấy");
    }

    @Override
    public ResponseDTO<?> getList(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = bookingTicketRepository.findAll(pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(
                page.getContent(),
                "Lấy danh sách đơn hàng thành công",
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    public ResponseDTO<?> getByState(long userId, State state) {
        List<BookingTicketEntity> data = bookingTicketRepository.findByQuery(userId, state);
        Set<BookingTicketResponse> listBookingTicket = new HashSet<>();
        for (BookingTicketEntity bookingTicketEntity : data) {
            BookingTicketResponse bookingTicketResponse;
            Optional<BookingTicketEntity> optional = bookingTicketRepository.findById(bookingTicketEntity.getId());
            bookingTicketResponse = returnBookingTicket(optional);
            listBookingTicket.add(bookingTicketResponse);
        }
        return ResponseService.ok(listBookingTicket, "Lấy vé thành công");
    }

    public ResponseDTO<?> getByReservationCode(String reservationCode) {
        Optional<BookingTicketEntity> data = bookingTicketRepository.findByReservationCode(reservationCode);
        BookingTicketResponse bookingTicketResponse = returnBookingTicket(data);
        if (bookingTicketResponse != null) {
            return ResponseService.ok(bookingTicketResponse, "Tìm thấy thành công");
        }
        return ResponseService.notFound("Không tìm thấy vé với code: " + reservationCode);
    }

    @Override
    public ResponseDTO<?> getCountBookingTicketConfirm() {
        var data = bookingTicketRepository.countBookingTicketEntitiesByState(State.Confirm);
        return ResponseService.ok(data, "Lấy thành công");
    }

    @Override
    public ResponseDTO<?> confirmTicket(long id) throws ParseException {
        Optional<BookingTicketEntity> optional = bookingTicketRepository.findById(id);
        if (optional.isPresent()) {
            BookingTicketEntity bookingTicket = optional.get();
            if (State.Pending.equals(bookingTicket.getState())) {
                Optional<DistanceEntity> distance = distanceRepository.findById(bookingTicket.getDistanceId());
                if (distance.isPresent()) {
                    Date combinedDateTime = getEndTimeOfDistance(bookingTicket, distance);
                    bookingTicket.setState(State.Confirm);
                    bookingTicket.setPrice(bookingTicket.getPrice() + bookingTicket.getPrice() * 0.1);
                    bookingTicket.setTimeToExpire(combinedDateTime);
                    bookingTicket.setUpdatedAt(new Date());
                    var data = bookingTicketRepository.save(bookingTicket);
                    return ResponseService.ok(data, "Xác nhận vé thành công");
                }
            }
        }
        return ResponseService.notFound("Không tìm thấy");
    }

    @Override
    public ResponseDTO<?> paidTicket(long id) throws ParseException {
        Optional<BookingTicketEntity> optional = bookingTicketRepository.findById(id);
        if (optional.isPresent()) {
            BookingTicketEntity bookingTicket = optional.get();
            if (State.Confirm.equals(bookingTicket.getState())) {
                Optional<DistanceEntity> distance = distanceRepository.findById(bookingTicket.getDistanceId());
                Date combinedDateTime = getEndTimeOfDistance(bookingTicket, distance);
                bookingTicket.setTimeToExpire(combinedDateTime);
                bookingTicket.setState(State.Paid);
                bookingTicket.setUpdatedAt(new Date());
                var data = bookingTicketRepository.save(bookingTicket);
                return ResponseService.ok(data, "Vé đã thanh toán thành công");
            }
        }
        return ResponseService.notFound("Không tìm thấy");
    }

    @Override
    public void markTicketAsUsed(long id) {
        Optional<BookingTicketEntity> optional = bookingTicketRepository.findById(id);
        if (optional.isPresent()) {
            BookingTicketEntity bookingTicket = optional.get();
            if ((bookingTicket.getState().equals(State.Paid) || bookingTicket.getState().equals(State.Confirm)) && bookingTicket.getTimeToExpire().before(new Date())) {
                bookingTicket.setState(State.Used);
                bookingTicket.setUpdatedAt(new Date());
                bookingTicketRepository.save(bookingTicket);
            }
        }
    }
    private BookingTicketResponse returnBookingTicket (Optional<BookingTicketEntity> data) {
        if (data.isPresent()) {
            BookingTicketResponse bookingTicketResponse = new BookingTicketResponse();
            bookingTicketResponse.setId(data.get().getId());
            bookingTicketResponse.setPrice(data.get().getPrice());
            bookingTicketResponse.setDate(data.get().getDate());
            bookingTicketResponse.setReservationCode(data.get().getReservationCode());
            bookingTicketResponse.setUserId(data.get().getUserId());
            bookingTicketResponse.setState(data.get().getState());
            bookingTicketResponse.setHelpBooking(data.get().getHelpBooking());
            bookingTicketResponse.setPassengerName(data.get().getPassengerName());
            bookingTicketResponse.setPassengerPhoneNumber(data.get().getPassengerPhoneNumber());
            bookingTicketResponse.setPassengerEmail(data.get().getPassengerEmail());
            bookingTicketResponse.setTimeToAdd(data.get().getTimeToAdd());
            bookingTicketResponse.setTimeToExpire(data.get().getTimeToExpire());
            bookingTicketResponse.setBookingTicketDetails(data.get().getBookingTicketDetails());

            Set<SeatEntity> seats = new HashSet<>();
            for (BookingTicketDetailEntity bookingTicketDetail : data.get().getBookingTicketDetails()) {
                SeatEntity seatEntity = new SeatEntity();
                Optional<SeatEntity> optional = seatRepository.findById(bookingTicketDetail.getSeatId());
                optional.ifPresent(seat -> {
                    seatEntity.setId(seat.getId());
                    seatEntity.setSeatCode(seat.getSeatCode());
                    seatEntity.setType(seat.getType());
                    seatEntity.setPosition(seat.getPosition());
                    seatEntity.setTypeRow(seat.getTypeRow());
                    seatEntity.setPriceTicketId(seat.getPriceTicketId());
                });
                seats.add(seatEntity);
            }
            bookingTicketResponse.setSeats(seats);

            Optional<DistanceEntity> optionalDistance = distanceRepository.findById(data.get().getDistanceId());
            optionalDistance.ifPresent(distanceEntity -> {
                DistanceDto distanceDto = new DistanceDto();
                distanceDto.setTimeDifference(distanceEntity.getTimeDifference());
                Optional<ScheduleEntity> optionalSchedule = scheduleRepository.findById(distanceEntity.getScheduleId());
                optionalSchedule.ifPresent(scheduleEntity -> {
                    Optional<LocationEntity> departure = locationRepository.findById(scheduleEntity.getDepartureId());
                    departure.ifPresent(departureEntity -> {
                        distanceDto.setScheduleDeparture(departureEntity.getName());
                    });
                    Optional<LocationEntity> destination = locationRepository.findById(scheduleEntity.getDestinationId());
                    destination.ifPresent(destinationEntity -> {
                        distanceDto.setScheduleDestination(destinationEntity.getName());
                    });
                });
                distanceDto.setStartTime(distanceEntity.getStartTime());
                distanceDto.setEndTime(distanceEntity.getEndTime());
                bookingTicketResponse.setDistance(distanceDto);
            });

            Optional<CoachEntity> optionalCoach = coachRepository.findById(data.get().getCoachId());
            optionalCoach.ifPresent(coach -> {
                BookingTicketCoachDto bookingTicketCoachDto = new BookingTicketCoachDto();
                bookingTicketCoachDto.setId(coach.getId());
                bookingTicketCoachDto.setName(coach.getName());
                bookingTicketCoachDto.setPlateNumber(coach.getPlateNumber());
                bookingTicketCoachDto.setDescription(coach.getDescription());

                bookingTicketResponse.setCoach(bookingTicketCoachDto);
            });

            Optional<PickUpPointEntity> optionalPickUpPointEntity = pickUpRepo.findById(data.get().getPickUpPointId());
            optionalPickUpPointEntity.ifPresent(pickUpPointEntity -> {
                PickUpDto pickUpDto = new PickUpDto();
                pickUpDto.setId(pickUpPointEntity.getId());
                pickUpDto.setStatus(pickUpPointEntity.getStatus());
                pickUpDto.setTime(pickUpPointEntity.getTime());
                pickUpDto.setDefault(pickUpPointEntity.isDefault());
                Optional<LocationEntity> optional = locationRepository.findById(pickUpPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    pickUpDto.setLocationName(locationEntity.getName());
                    pickUpDto.setAddress(locationEntity.getAddress());
                    pickUpDto.setLocationId(locationEntity.getId());
                });
                bookingTicketResponse.setPickUp(pickUpDto);
            });

            Optional<DropOffPointEntity> optionalDropOffPointEntity = dropOffRepo.findById(data.get().getDropOffPointId());
            optionalDropOffPointEntity.ifPresent(dropOffPointEntity -> {
                DropOffDto dropOffDto = new DropOffDto();
                dropOffDto.setId(dropOffPointEntity.getId());
                dropOffDto.setStatus(dropOffPointEntity.getStatus());
                dropOffDto.setTime(dropOffPointEntity.getTime());
                dropOffDto.setDefault(dropOffPointEntity.isDefault());
                Optional<LocationEntity> optional = locationRepository.findById(dropOffPointEntity.getLocationId());
                optional.ifPresent(locationEntity -> {
                    dropOffDto.setLocationName(locationEntity.getName());
                    dropOffDto.setAddress(locationEntity.getAddress());
                    dropOffDto.setLocationId(locationEntity.getId());
                });
                bookingTicketResponse.setDropOff(dropOffDto);
            });
            return bookingTicketResponse;
        }
        return null;
    }
    private Date getEndTimeOfDistance(BookingTicketEntity bookingTicket, Optional<DistanceEntity> distance) throws ParseException {
        if (distance.isPresent()) {
            Time time = distance.get().getEndTime();
            String timeString = new SimpleDateFormat("HH:mm:ss").format(time);
            String dateString = new SimpleDateFormat("yyyy-MM-dd").format(bookingTicket.getDate());
            String combinedDateTimeString = dateString + " " + timeString;
            return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(combinedDateTimeString);
        }
        return null;
    }
}
