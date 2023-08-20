package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.BookingTicketRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.BookingTicketEntity;
import com.t2104e.biztrip.entities.State;

import java.text.ParseException;
import java.util.List;

public interface IBookingTicketService {
    ResponseDTO<?> booking(BookingTicketRequest request);
    ResponseDTO<?> update(long id, BookingTicketRequest request);
    ResponseDTO<?> cancel(long id);
    ResponseDTO<?> getById(long id);
    ResponseDTO<?> getByUserId(long userId);
    ResponseDTO<?> getList(int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDTO<?> getByState(long userId, State state);
    ResponseDTO<?> delete(long id);
    List<BookingTicketEntity> findExpireBookingTicket();
    ResponseDTO<?> confirmTicket(long id) throws ParseException;
    ResponseDTO<?> paidTicket(long id) throws ParseException;
    void markTicketAsUsed(long id);
    ResponseDTO<?> getByReservationCode(String reservationCode);
    ResponseDTO<?> getCountBookingTicketConfirm();
}
