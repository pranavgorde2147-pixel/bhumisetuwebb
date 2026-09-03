package com.bhumisetu.notification;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final NotificationRepository notificationRepository;

    public List<NotificationResponse> getByRecipientId(String recipientId) {
        List<Notification> notifications = notificationRepository.findByRecipientId(recipientId);
        return notifications.stream().map(NotificationResponse::fromEntity).toList();
    }

    public List<NotificationResponse> getUnreadByRecipientId(String recipientId) {
        List<Notification> notifications = notificationRepository.findByRecipientIdAndStatus(recipientId, "UNREAD");
        return notifications.stream().map(NotificationResponse::fromEntity).toList();
    }

    public long getUnreadCount(String recipientId) {
        return notificationRepository.countByRecipientIdAndStatus(recipientId, "UNREAD");
    }

    @Transactional
    public NotificationResponse createNotification(String recipientId, String type, String title, String message, String referenceId) {
        Notification notification = Notification.builder()
            .recipientId(recipientId)
            .notificationType(type)
            .title(title)
            .message(message)
            .referenceId(referenceId)
            .status("UNREAD")
            .channel("IN_APP")
            .build();

        Notification saved = notificationRepository.save(notification);
        return NotificationResponse.fromEntity(saved);
    }

    @Transactional
    public void markAsRead(Long notificationId) {
        notificationRepository.findById(notificationId).ifPresent(notification -> {
            notification.setStatus("READ");
            notificationRepository.save(notification);
        });
    }
}
