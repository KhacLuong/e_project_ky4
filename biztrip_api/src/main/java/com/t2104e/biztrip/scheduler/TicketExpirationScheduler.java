package com.t2104e.biztrip.scheduler;

import com.t2104e.biztrip.entities.BookingTicketEntity;
import com.t2104e.biztrip.entities.State;
import com.t2104e.biztrip.repositories.BookingTicketRepository;
import com.t2104e.biztrip.services.interfaces.IBookingTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.List;

@Component
public class TicketExpirationScheduler {
    @Autowired
    private IBookingTicketService iBookingTicketService;
    @Autowired
    private BookingTicketRepository bookingTicketRepository;

    @Scheduled(fixedRate = 30000)
//    @Scheduled(cron = "0 * * * * ?")
    public void checkExpiredTickets()  {
        List<BookingTicketEntity> expiredTickets = iBookingTicketService.findExpireBookingTicket();
        for (BookingTicketEntity ticket : expiredTickets) {
            if (ticket.getState().equals(State.Pending) && isAfterTimeToExpire(ticket.getTimeToExpire().toInstant())) {
                iBookingTicketService.delete(ticket.getId());
            } else if (ticket.getState().equals(State.Paid) || ticket.getState().equals(State.Confirm)) {
                iBookingTicketService.markTicketAsUsed(ticket.getId());
            }
        }
    }
    private boolean isAfterTimeToExpire(Instant timeToExpire) {
        Instant currentTime = Instant.now();
        return currentTime.isAfter(timeToExpire);
    }
}
