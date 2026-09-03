package com.bhumisetu.notification;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientId(String recipientId);
    List<Notification> findByRecipientIdAndStatus(String recipientId, String status);
    long countByRecipientIdAndStatus(String recipientId, String status);
}
