package com.bhumisetu.transaction;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "transaction_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @Column(length = 50)
    private String eventType;

    @Column(columnDefinition = "TEXT")
    private String payload;

    @Column(length = 50)
    private String triggeredBy;

    @CreationTimestamp
    private LocalDateTime eventAt;
}
