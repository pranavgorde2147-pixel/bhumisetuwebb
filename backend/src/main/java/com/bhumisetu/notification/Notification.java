package com.bhumisetu.notification;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String recipientId;

    @Column(length = 30)
    private String notificationType;

    @Column(length = 200)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String message;

    @Column(length = 50)
    private String referenceId;

    @Column(length = 30)
    private String referenceType;

    @Column(length = 30)
    @Builder.Default
    private String status = "UNREAD";

    @Column(length = 30)
    private String channel;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
