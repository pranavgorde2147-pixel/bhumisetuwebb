package com.bhumisetu.notification;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {
    private Long id;
    private String recipientId;
    private String notificationType;
    private String title;
    private String message;
    private String referenceId;
    private String referenceType;
    private String status;
    private String channel;
    private LocalDateTime createdAt;

    public static NotificationResponse fromEntity(Notification notification) {
        return NotificationResponse.builder()
            .id(notification.getId())
            .recipientId(notification.getRecipientId())
            .notificationType(notification.getNotificationType())
            .title(notification.getTitle())
            .message(notification.getMessage())
            .referenceId(notification.getReferenceId())
            .referenceType(notification.getReferenceType())
            .status(notification.getStatus())
            .channel(notification.getChannel())
            .createdAt(notification.getCreatedAt())
            .build();
    }
}
