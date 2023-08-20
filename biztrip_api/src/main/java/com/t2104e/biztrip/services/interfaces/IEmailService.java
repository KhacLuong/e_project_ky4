package com.t2104e.biztrip.services.interfaces;

public interface IEmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
