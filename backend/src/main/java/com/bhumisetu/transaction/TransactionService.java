package com.bhumisetu.transaction;

import com.bhumisetu.common.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;

    public List<TransactionResponse> getByParcelId(String parcelId) {
        List<Transaction> txns = transactionRepository.findByParcelId(parcelId);
        return txns.stream().map(TransactionResponse::fromEntity).toList();
    }

    public TransactionResponse getById(Long id) {
        Transaction txn = transactionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + id));
        return TransactionResponse.fromEntity(txn);
    }

    public TransactionResponse getByTransactionId(String transactionId) {
        Transaction txn = transactionRepository.findByTransactionId(transactionId)
            .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + transactionId));
        return TransactionResponse.fromEntity(txn);
    }
}
