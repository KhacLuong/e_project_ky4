package com.t2104e.biztrip.component;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.t2104e.biztrip.entities.BookingTicketEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.management.Notification;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;

@Component
public class BookingTicketWebSocketHandler{

}
