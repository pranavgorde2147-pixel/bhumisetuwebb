package com.bhumisetu.notification;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/{recipientId}")
    public ApiResponse<List<NotificationResponse>> getNotifications(@PathVariable String recipientId) {
        return ApiResponse.success(notificationService.getByRecipientId(recipientId));
    }

    @GetMapping("/{recipientId}/unread")
    public ApiResponse<List<NotificationResponse>> getUnreadNotifications(@PathVariable String recipientId) {
        return ApiResponse.success(notificationService.getUnreadByRecipientId(recipientId));
    }

    @GetMapping("/{recipientId}/unread/count")
    public ApiResponse<Long> getUnreadCount(@PathVariable String recipientId) {
        return ApiResponse.success(notificationService.getUnreadCount(recipientId));
    }

    @PutMapping("/{id}/read")
    public ApiResponse<Void> markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
        return ApiResponse.success("Marked as read", null);
    }
}
