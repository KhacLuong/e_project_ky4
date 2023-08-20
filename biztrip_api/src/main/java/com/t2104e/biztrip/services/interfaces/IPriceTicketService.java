package com.t2104e.biztrip.services.interfaces;

import com.t2104e.biztrip.command.PriceTicketRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.PriceTicketEntity;

public interface IPriceTicketService {
    ResponseDTO<?> getListPriceTicket(int pageNumber, int perPage, String sortField, String sortDir, String keyword);
    ResponseDTO<?> getOnePriceTicketById(long id);
    ResponseDTO<?> deletePriceTicket(long id);
    ResponseDTO<?> createPriceTicket(PriceTicketEntity ticket);
    ResponseDTO<?> updatePriceTicket(PriceTicketRequest priceTicketRequest);
}
