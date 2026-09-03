package com.bhumisetu.transaction;

import com.bhumisetu.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @GetMapping("/{id}")
    public ApiResponse<TransactionResponse> getById(@PathVariable Long id) {
        return ApiResponse.success(transactionService.getById(id));
    }

    @GetMapping("/by-txn-id/{transactionId}")
    public ApiResponse<TransactionResponse> getByTransactionId(@PathVariable String transactionId) {
        return ApiResponse.success(transactionService.getByTransactionId(transactionId));
    }

    @GetMapping("/parcel/{parcelId}")
    public ApiResponse<List<TransactionResponse>> getByParcelId(@PathVariable String parcelId) {
        return ApiResponse.success(transactionService.getByParcelId(parcelId));
    }
}
