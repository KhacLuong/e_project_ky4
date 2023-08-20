package com.t2104e.biztrip.controllers;

import com.stripe.exception.SignatureVerificationException;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.net.Webhook;
import com.t2104e.biztrip.command.OrderRequest;
import com.t2104e.biztrip.services.eloquents.StripeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/stripe")
@RequiredArgsConstructor
public class StripePaymentController {
    private final StripeService stripeService;

//    @PostMapping("/create-payment-intent")
//    public ResponseEntity<?> createPaymentIntent (@RequestBody OrderRequest createPayment) throws StripeException {
//        var data = stripeService.createPaymentIntent(createPayment);
//        return new ResponseEntity<>(
//                data,
//                HttpStatusCode.valueOf(data.getCode())
//        );
//    }

    @PostMapping("/events")
    public ResponseEntity<?> handleStripeEvent(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        var data = stripeService.handleStripeEvent(payload, sigHeader);
        return new ResponseEntity<>(data, HttpStatusCode.valueOf(data.getCode()));
    }
}
