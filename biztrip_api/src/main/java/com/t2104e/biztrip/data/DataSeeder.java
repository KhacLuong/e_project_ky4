//package com.t2104e.biztrip.data;
//
//import com.t2104e.biztrip.entities.*;
//import com.t2104e.biztrip.repositories.*;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.ArrayList;
//import java.util.List;
//
//@Component
//public class DataSeeder implements CommandLineRunner {
//
//    private final UserRepository userRepository;
//    private final CoachRepository coachRepository;
//    private final LocationRepository locationRepo;
//    private final UtilityRepository utilityRepo;
//    private final PriceTicketRepository priceTicketRepo;
//    private final ThumbnailRepository thumbnailRepo;
//    private final SeatRepository seatRepo;
//    private final ScheduleRepository scheduleRepo;
//    private final DistanceRepository distanceRepo;
//    private final PickUpRepository pickUpRepo;
//    private final DropOffRepository dropOffRepo;
//    private  final  ReviewRepository reviewRepo;
//    private final  BookingTicketRepository bookingTicketRepo;
//    private final BookingTicketDetailRepository bookingTicketDetailRepo;
//    public DataSeeder(UserRepository userRepository, CoachRepository coachRepository, LocationRepository locationRepo, UtilityRepository utilityRepo, PriceTicketRepository priceTicketRepo, ThumbnailRepository thumbnailRepo, SeatRepository seatRepo, ScheduleRepository scheduleRepo, DistanceRepository distanceRepo, PickUpRepository pickUpRepo, DropOffRepository dropOffRepo, ReviewRepository repository, ReviewRepository reviewRepos, BookingTicketRepository bookingTicketRepo, BookingTicketDetailRepository bookingTicketDetailRepo) {
//        this.userRepository = userRepository;
//        this.coachRepository = coachRepository;
//        this.locationRepo = locationRepo;
//        this.utilityRepo = utilityRepo;
//        this.priceTicketRepo = priceTicketRepo;
//        this.thumbnailRepo = thumbnailRepo;
//        this.seatRepo = seatRepo;
//        this.scheduleRepo = scheduleRepo;
//        this.distanceRepo = distanceRepo;
//        this.pickUpRepo = pickUpRepo;
//        this.dropOffRepo = dropOffRepo;
//        this.reviewRepo = reviewRepos;
//        this.bookingTicketRepo = bookingTicketRepo;
//        this.bookingTicketDetailRepo = bookingTicketDetailRepo;
//    }
//    @Transactional
//    @Override
//    public void run(String... args) throws Exception {
//
//        if (userRepository.findAll().isEmpty()) {
//            List<UserEntity> users = new ArrayList<>();
//            users.add(new UserEntity("2023-07-22 09:23:55", "1999-02-28 07:00:00.000000", "caubelamli@gmail.com", "Đức Anh", Gender.Male, true, "$2a$10$7yCyJzakM1NOMLMlGxpWhevTeoNyxggx1aczPO2EdyEiPesgiqPWy", null, null, "0987654321", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYXViZWxhbWxpQGdtYWlsLmNvbSIsImlhdCI6MTY5MTEwNDI2MSwiZXhwIjoxNjkxNzA5MDYxfQ.pc8BAEEVKOSjPFJRzI79CWRw4mj2sNiTJiEQc7qX_s4", Role.USER, null, null, false, false, "2023-07-22 11:53:12", "2023-07-22 09:23:55.308000", null));
//            users.add(new UserEntity("2023-07-23 05:16:10", "1998-12-28 05:16:11.000000", "admin@gmail.com", "Duc Anh", Gender.Male, false, "$2a$10$Ydw1.SCGU5N9AlKdRc7ehOP3U0K5GftxZEfNoDz4yzTvS9aV6vlIa", null, null, "0123456789", null, Role.ADMIN, null, null, true, true, "2023-07-23 05:31:35", "2023-07-23 05:31:36.000000", null));
//            users.add(new UserEntity("2023-08-04 06:10:02", "2010-02-04 07:00:00.000000", "caubelamli2@gmail.com", "hasdasdas ádasd", Gender.Male, true, "$2a$10$9yxQ5xjBPtu7EhVh4G7u7eiJRJXtM/cIatiBgEV0JJx8FoC8SYbGG", null, null, "4567891230", null, Role.USER, null, null, true, true, "2023-08-04 06:10:22", "2023-08-04 06:10:01.536000", null));
//            userRepository.saveAll(users);
//        }
//
//        if (coachRepository.findAll().isEmpty()) {
//            List<CoachEntity> coaches = new ArrayList<>();
//            coaches.add(new CoachEntity("2023-07-20 20:10:16", "", "https://eprojectsem4.blob.core.windows.net/coaches/thumbnail-8.jpeg", "BizTrip 001", "29B-99999", 0, "active", 0, "2023-07-20 20:10:16"));
//            coaches.add(new CoachEntity("2023-07-20 20:19:00", "", "https://eprojectsem4.blob.core.windows.net/coaches/thumbnail-8.jpeg", "Test 123", "1234567", 200000, "active", 13, "2023-07-20 20:19:00"));
//            coachRepository.saveAll(coaches);
//        }
//
//        if (locationRepo.findAll().isEmpty()) {
//            List<LocationEntity> locations = new ArrayList<>();
//            locations.add(new LocationEntity("", "2023-07-20 20:06:58", "Hà Nội", 0, true, "2023-07-20 20:06:58"));
//            locations.add(new LocationEntity("", "2023-07-20 20:07:09", "Thanh Hoá", 0, true, "2023-07-20 20:07:09"));
//            locations.add(new LocationEntity("", "2023-07-20 20:07:09", "Đà nẵng", 0, true, "2023-07-20 20:07:09"));
//            locations.add(new LocationEntity("Số 895 Giải Phóng", "2023-07-20 20:07:20", "Bến xe Giáp Bát", 1, true, "2023-07-20 20:07:20"));
//            locations.add(new LocationEntity("BigC Thanh Hoá", "2023-07-20 20:07:33", "BigC Thanh Hoá", 2, true, "2023-07-20 20:07:33"));
//            locations.add(new LocationEntity("Số 30 Phạm Hùng", "2023-07-27 13:23:57", "Bến xe Mỹ Đình", 1, true, "2023-07-27 13:23:59"));
//            locations.add(new LocationEntity("Số 20 Thường Xuân", "2023-07-27 13:23:58", "Thường Xuân", 2, true, "2023-07-27 13:24:03"));
//            locations.add(new LocationEntity("Số 10 Đinh Tiên Hoàng", "2023-07-27 13:23:57", "Bến xe trung tâm Đà Nẵng", 1, true, "2023-07-27 13:23:59"));
//            locations.add(new LocationEntity("Số 100 Bà Triệu", "2023-07-27 13:23:58", "Văn phòng Đà nẵng", 2, true, "2023-07-27 13:24:03"));
//            locationRepo.saveAll(locations);
//        }
//
//        if (utilityRepo.findAll().isEmpty()) {
//            List<UtilityEntity> utilities = new ArrayList<>();
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Wifi", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Điều hòa", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Tivi LED", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Sạc điện thoại", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Rèm cửa", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Chăn đắp", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Nước suối", "2023-07-20 20:08:27"));
//            utilities.add(new UtilityEntity("2023-07-20 20:08:27", "", "https://eprojectsem4.blob.core.windows.net/utilities/cat1.png", true, "Khăn lạnh", "2023-07-20 20:08:27"));
//            utilityRepo.saveAll(utilities);
//        }
//
//        if (priceTicketRepo.findAll().isEmpty()) {
//            List<PriceTicketEntity> priceTickets = new ArrayList<>();
//            priceTickets.add(new PriceTicketEntity(1, "2023-07-20 20:10:53", 100000, "thường", "2023-07-20 20:10:53"));
//            priceTickets.add(new PriceTicketEntity(2, "2023-07-20 20:11:14", 200000, "vip", "2023-07-20 20:11:14"));
//            priceTicketRepo.saveAll(priceTickets);
//        }
//
//        if (thumbnailRepo.findAll().isEmpty()) {
//            List<ThumbnailEntity> thumbnails = new ArrayList<>();
//            thumbnails.add(new ThumbnailEntity("2023-07-20 20:10:16", "https://eprojectsem4.blob.core.windows.net/thumbnails/thumbnail-4.jpeg", "123", "2023-07-20 20:10:16", coachRepository.findById(1L).orElse(null)));
//            thumbnails.add(new ThumbnailEntity("2023-07-20 20:10:16", "https://eprojectsem4.blob.core.windows.net/thumbnails/thumbnail-2.jpeg", "xyz", "2023-07-20 20:10:16", coachRepository.findById(1L).orElse(null)));
//            thumbnails.add(new ThumbnailEntity("2023-07-20 20:10:16", "https://eprojectsem4.blob.core.windows.net/thumbnails/thumbnail-1.jpeg", "abc", "2023-07-20 20:10:16", coachRepository.findById(1L).orElse(null)));
//            thumbnails.add(new ThumbnailEntity("2023-07-20 20:10:16", "https://eprojectsem4.blob.core.windows.net/thumbnails/thumbnail-2.jpeg", "xyz", "2023-07-20 20:10:16", coachRepository.findById(2L).orElse(null)));
//            thumbnails.add(new ThumbnailEntity("2023-07-20 20:10:16", "https://eprojectsem4.blob.core.windows.net/thumbnails/thumbnail-1.jpeg", "abc", "2023-07-20 20:10:16", coachRepository.findById(2L).orElse(null)));
//            thumbnailRepo.saveAll(thumbnails);
//        }
//
//        if (seatRepo.findAll().isEmpty()) {
//            List<SeatEntity> seats = new ArrayList<>();
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 6, "A2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 14, "D3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 3, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 20, "E4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 5, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 4, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 2, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 16, "A4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 17, "B4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 11, "A3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 9, "D2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 8, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 1, "", "driver", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 7, "B2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 12, "B3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 18, "C4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 10, "E2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 15, "E3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 13, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(2L).orElse(null), null));
//
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 6, "A2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 14, "D3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 3, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 20, "E4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 5, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 4, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 2, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 16, "A4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 17, "B4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 11, "A3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 9, "D2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 8, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 1, "", "driver", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 7, "B2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 12, "B3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 18, "C4", "seat", TypeRow.Bottom, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 10, "E2", "seat", TypeRow.Top, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 15, "E3", "seat", TypeRow.Middle, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), priceTicketRepo.findById(2L).orElse(null)));
//            seats.add(new SeatEntity("2023-07-20 20:19:00", 13, "", "space", null, "2023-07-20 20:19:00", coachRepository.findById(1L).orElse(null), null));
//            seatRepo.saveAll(seats);
//        }
//
//
//        coachRepository.findById(1L).ifPresent(coach1 -> coach1.getUtilities().addAll(utilityRepo.findAll()));
//        coachRepository.findById(2L).ifPresent(coach2 -> coach2.getUtilities().addAll(utilityRepo.findAll()));
//
//
//        if (scheduleRepo.findAll().isEmpty()) {
//            List<ScheduleEntity> schedules = new ArrayList<>();
//            schedules.add(new ScheduleEntity( "2023-07-25 19:33:46", 1, 2, null, false, "abc123", "active", "2023-07-25 19:33:56"));
//            schedules.add(new ScheduleEntity( "2023-07-25 19:33:46", 1, 3, null, false, "abc123", "active", "2023-07-25 19:33:56"));
//            schedules.add(new ScheduleEntity("2023-07-25 19:33:46", 2, 3, null, false, "abc123", "active", "2023-07-25 19:33:56"));
//            scheduleRepo.saveAll(schedules);
//
//        }
//
//        if (distanceRepo.findAll().isEmpty()){
//            List<DistanceEntity> distances = new ArrayList<>();
//            distances.add(new DistanceEntity( 1, "2023-07-22 17:07:20", null, null, "17:07:30", 1, "12:00:00", 307, 1, "2023-07-22 17:08:08"));
//            distances.add(new DistanceEntity( 2, "2023-07-22 17:07:20", null, null, "17:07:30", 1, "12:00:00", 307, 1, "2023-07-22 17:08:08"));
//            distances.add(new DistanceEntity( 2, "2023-07-22 17:07:20", null, null, "17:07:30", 2, "12:00:00", 307, 1, "2023-07-22 17:08:08"));
//            distanceRepo.saveAll(distances);
//        }
//
//        if(pickUpRepo.findAll().isEmpty()){
//
//            List<PickUpPointEntity> pickUpPoints = new ArrayList<>();
//            pickUpPoints.add(new PickUpPointEntity("2023-07-26 21:20:46", 0, 0, 1, true, 3, "active", "14:07:50", "2023-07-26 21:21:20"));
//            pickUpPoints.add(new PickUpPointEntity( "2023-07-26 21:20:46", 0, 0, 1, false, 5, "active", "14:25:00", "2023-07-26 21:21:20"));
//            pickUpRepo.saveAll(pickUpPoints);
//
//        }
//
//
//
//        if (dropOffRepo.findAll().isEmpty()){
//            List<DropOffPointEntity> dropOffPoints = new ArrayList<>();
//            dropOffPoints.add(new DropOffPointEntity( "2023-07-26 21:21:29", 0, 0, 1, true, 4, "active", "17:07:30", "2023-07-26 21:21:49"));
//            dropOffPoints.add(new DropOffPointEntity("2023-07-26 21:21:29", 0, 0, 1, false, 6, "active", "17:20:10", "2023-07-26 21:21:49"));
//            dropOffRepo.saveAll(dropOffPoints);
//        }
//
//        if (reviewRepo.findAll().isEmpty()){
//            List<ReviewEntity> reviews = new ArrayList<>();
//            reviews.add(new ReviewEntity( 1, 4, "xin chào các bạn", "2023-08-04 03:33:16", 4, 5, 3, 5, 4, "2023-08-04 03:33:27", 3, coachRepository.findById(2L).orElse(null), userRepository.findById(1L).orElse(null),"2023-07-26 21:21:49", "2023-07-27 21:21:49"));
//            reviews.add(new ReviewEntity( 2, 4, "dịch vụ rất xin xò", "2023-08-04 03:33:16", 4, 5, 3, 5, 4, "2023-08-04 03:33:27", 3, coachRepository.findById(2L).orElse(null), userRepository.findById(2L).orElse(null),"2023-07-26 21:21:49", "2023-07-27 21:21:49"));
//            reviewRepo.saveAll(reviews);
//        }
//
//        if (bookingTicketRepo.findAll().isEmpty()){
//            List<BookingTicketEntity> bookingTickets = new ArrayList<>();
//            bookingTickets.add(new BookingTicketEntity( 2, "2023-07-26 17:16:03", "2023-08-02", 1, 2, false, "123", "test@gmail.com", "duc anh", "0987654321", 2, 400000, "abcd123", State.Used, "2023-07-26 17:17:04.000000", "2023-07-29 17:17:09.000000", "2023-08-04 03:11:39", 6));
//            bookingTickets.add(new BookingTicketEntity(2, "2023-08-04 04:55:22", "2023-08-05", 1, 2, false, null, "caubelamli@gmail.com", "Đức Anh", "0987654321", 2, 1100000, "WJC8XO5", State.Cancel, null, null, "2023-08-04 04:56:01", 6));
//            bookingTickets.add(new BookingTicketEntity( 2, "2023-08-04 06:12:40", "2023-08-05", 1, 2, false, null, "caubelamli@gmail.com", "Đức Anh", "0987654321", 2, 400000, "Y0IIAZY", State.Pending, "2023-08-04 06:12:40.176000", "2023-08-04 06:27:40.176000", "2023-08-04 06:12:40", 6));
//            bookingTicketRepo.saveAll(bookingTickets);
//        }
//
//        if (bookingTicketDetailRepo.findAll().isEmpty()){
//            List<BookingTicketDetailEntity> bookingTickets = new ArrayList<>();
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-02", "17:07:30", 1, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-02", "17:07:30", 2, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-02", "17:07:30", 3, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-02", "17:07:30", 3, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 4, "12:00:00", bookingTicketRepo.findById(2L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 5, "12:00:00", bookingTicketRepo.findById(2L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 6, "12:00:00", bookingTicketRepo.findById(2L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 7, "12:00:00", bookingTicketRepo.findById(2L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 8, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 9, "12:00:00", bookingTicketRepo.findById(2L).orElse(null)));
//            bookingTickets.add(new BookingTicketDetailEntity("2023-08-05", "17:07:30", 10, "12:00:00", bookingTicketRepo.findById(1L).orElse(null)));
//            bookingTicketDetailRepo.saveAll(bookingTickets);
//        }
//
//
//
//
//
//
//
//
//
//
//
//
//
//    }
//
//
//}