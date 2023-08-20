package com.t2104e.biztrip.services.interfaces;

import com.stripe.exception.StripeException;
import com.t2104e.biztrip.command.OrderRequest;
import com.t2104e.biztrip.dto.ResponseDTO;

public interface IOrderService {
    ResponseDTO<?> getListOrder(int pageNumber, int perPage, String sortField, String sortDir);
    ResponseDTO<?> getOrderById(long id);
    ResponseDTO<?> getOrderByUserId(long userId);
    ResponseDTO<?> createNewOrder(OrderRequest request) throws StripeException;
}
