package com.t2104e.biztrip.services.eloquents;

import com.stripe.exception.StripeException;
import com.t2104e.biztrip.command.OrderItemRequest;
import com.t2104e.biztrip.command.OrderRequest;
import com.t2104e.biztrip.dto.CreatePaymentResponse;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.entities.OrderEntity;
import com.t2104e.biztrip.entities.OrderItemEntity;
import com.t2104e.biztrip.repositories.OrderItemRepository;
import com.t2104e.biztrip.repositories.OrderRepository;
import com.t2104e.biztrip.repositories.UserRepository;
import com.t2104e.biztrip.services.interfaces.IEmailService;
import com.t2104e.biztrip.services.interfaces.IOrderService;
import com.t2104e.biztrip.utils.Helper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class OrderImplService implements IOrderService {
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final IEmailService eMailService;
    private final UserRepository userRepository;
    private final StripeService stripeService;

    @Override
    public ResponseDTO<?> getListOrder(int pageNumber, int perPage, String sortField, String sortDir) {
        Pageable pageable = Helper.pageableQuery(pageNumber, perPage, sortField, sortDir);
        var page = orderRepository.findAll(pageable);
        long totalItems = page.getTotalElements();
        int totalPages = page.getTotalPages();
        return ResponseService.ok(
                page.getContent(),
                "Lấy danh sách đơn hàng thành công",
                pageNumber, perPage, totalItems, totalPages, sortField, sortDir);
    }

    @Override
    public ResponseDTO<?> getOrderById(long id) {
        Optional<OrderEntity> data = orderRepository.findById(id);
        if (data.isPresent()) {
            return ResponseService.ok(data.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> getOrderByUserId(long userId) {
        Optional<OrderEntity> data = orderRepository.findByUserId(userId);
        if (data.isPresent()) {
            return ResponseService.ok(data.get(), "Lay thanh cong");
        }
        return ResponseService.notFound("Khong tim thay");
    }

    @Override
    public ResponseDTO<?> createNewOrder(OrderRequest orderRequest) throws StripeException {
        // Tao payment intent
        String clientSecret = stripeService.createPaymentIntent(orderRequest);
        // Luu order vao db
        var order = OrderEntity.builder()
                .userId(orderRequest.getUserId())
                .totalAmount(orderRequest.getTotalAmount())
                .createdAt(new Date())
                .clientSecret(clientSecret)
                .build();
        var savedOrder = orderRepository.save(order);
        for (OrderItemRequest orderItemRequest: orderRequest.getOrderItemRequests()) {
            var orderItem = OrderItemEntity.builder()
                    .orderId(savedOrder.getId())
                    .bookingTicketId(orderItemRequest.getBookingTicketId())
                    .subAmount(orderItemRequest.getSubAmount())
                    .build();
            orderItemRepository.save(orderItem);
        }

        // Gui email xac nhan dat hang
        var user = userRepository.findById(orderRequest.getUserId()).orElseThrow();
        eMailService.sendSimpleMessage(
                user.getEmail(),
                "Xác nhận đơn hàng",
                "Bấm vào đường dẫn này:\n" +
                        "localhost:9090/api/v1/order/" + savedOrder.getId()
        );
        return ResponseService.created(clientSecret, "Đặt vé thành công.");
    }
}
