package com.t2104e.biztrip.services.eloquents;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.StripeObject;
import com.stripe.net.Webhook;
import com.stripe.param.PaymentIntentCreateParams;
import com.t2104e.biztrip.command.OrderRequest;
import com.t2104e.biztrip.dto.ResponseDTO;
import com.t2104e.biztrip.repositories.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class StripeService {
    @Value("${stripe.webhook.secret}")
    private String endpointsSecret;
    private final OrderRepository orderRepository;

    public String createPaymentIntent (OrderRequest order) throws StripeException {
        PaymentIntentCreateParams createParams = new PaymentIntentCreateParams.Builder()
                .setCurrency("vnd")
                .setAmount(order.getTotalAmount())
                .build();
        PaymentIntent intent = PaymentIntent.create(createParams);
        return intent.getClientSecret();
    }

    public ResponseDTO<?> handleStripeEvent(String payload, String sigHeader) {
        if (sigHeader == null) {
            return ResponseService.badRequest("Signature Header is null.");
        }
        Event event;
        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointsSecret);
        } catch (SignatureVerificationException e) {
            return ResponseService.badRequest("Webhook error: SignatureVerificationException " + e);
        }
        // Deserialize the nested object inside the event
        EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
        StripeObject stripeObject = null;
        if (dataObjectDeserializer.getObject().isPresent()) {
            stripeObject = dataObjectDeserializer.getObject().get();
        } else {
            // Deserialization failed, probably due to an API version mismatch.
            // Refer to the Javadoc documentation on `EventDataObjectDeserializer` for
            // instructions on how to handle this case, or return an error here.
        }
        // Handle the event
        switch (event.getType()) {
            case "payment_intent.succeeded" -> {
                PaymentIntent paymentIntent = (PaymentIntent) stripeObject;
                assert paymentIntent != null;
//                System.out.println("Payment for " + paymentIntent.getAmount() + " succeeded.");
                var clientSecret = paymentIntent.getClientSecret();
                var data = orderRepository.findByClientSecret(clientSecret);
                if (data.isEmpty()){
                    return ResponseService.noContent("Không có đơn hàng.");
                }
                var order = data.get();
                order.setPaid(true);
                order.setUpdatedAt(new Date());
                orderRepository.save(order);
                return ResponseService.ok(null, "Payment for" + paymentIntent.getAmount() + " succeeded.");
            }
            // Then define and call a method to handle the successful payment intent.
            // handlePaymentIntentSucceeded(paymentIntent);
//            case "payment_method.attached" -> {
//                PaymentMethod paymentMethod = (PaymentMethod) stripeObject;
//            }
            // Then define and call a method to handle the successful attachment of a PaymentMethod.
            // handlePaymentMethodAttached(paymentMethod);
            default -> {
                return ResponseService.badRequest("Unhandled event type: " + event.getType());
            }
        }
    }
}
