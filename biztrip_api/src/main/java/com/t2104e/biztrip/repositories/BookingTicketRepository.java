package com.t2104e.biztrip.repositories;

import com.t2104e.biztrip.entities.BookingTicketEntity;
import com.t2104e.biztrip.entities.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.util.Date;
import java.util.List;
import java.util.Optional;

public interface BookingTicketRepository extends JpaRepository<BookingTicketEntity, Long> {
    List<BookingTicketEntity> findByUserId(long userId);
    @Query("SELECT bt from booking_tickets bt where bt.userId = ?1 and bt.state = ?2")
    List<BookingTicketEntity> findByQuery(long userId, State state);
    @Query("SELECT bt from booking_tickets bt where bt.reservationCode = ?1")
    Optional<BookingTicketEntity> findByReservationCode(String reservationCode);

    List<BookingTicketEntity> findByTimeToExpireBefore(Date timeToExpire);

    long countBookingTicketEntitiesByState(State state);

    @Query("SELECT bt from booking_tickets bt where bt.id in(select btd.bookingTicketId from booking_ticket_details btd where btd.seatId = ?1 and btd.date = ?2 and btd.startTimeOfDistance = ?3 and btd.endTimeDistance = ?4) and bt.state not in ?5")
    Optional<BookingTicketEntity> findBookingTicketByBookingTicketDetailBySeatId(long seatId, Date date, Time startTime, Time endTime, List<State> states);

    boolean existsBookingTicketEntitiesByCoachIdAndUserIdAndStateAndId(long coachId, long userId, State state, long bookingTicketId);

    @Query("select bt from booking_tickets bt join booking_ticket_details btd on bt = btd.bookingTicketId where bt.date = ?1 and btd.seatId in (?2) and bt.distanceId = ?3 and bt.state not in ?4 and bt.timeToExpire > ?5")
    Optional<BookingTicketEntity> findBookingTicketEntitiesExists(Date date, List<Long> listSeatId, long distanceId, List<State> states, Date currentTime);
}
