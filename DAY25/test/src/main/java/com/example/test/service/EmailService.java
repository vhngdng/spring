package com.example.test.service;

import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

  private final JavaMailSender mailSender;

  public void sendMail(String email, String subject, String body) {
    SimpleMailMessage message = new SimpleMailMessage();

    message.setTo(email);
    message.setSubject(subject);
    message.setText(body);

    mailSender.send(message);
  }
}
