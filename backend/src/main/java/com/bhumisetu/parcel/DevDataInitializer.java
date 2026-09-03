package com.bhumisetu.parcel;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Slf4j
@Component
@Profile("development")
@RequiredArgsConstructor
public class DevDataInitializer implements CommandLineRunner {

    private final ParcelRepository parcelRepository;

    @Override
    public void run(String... args) {
        if (!parcelRepository.existsByParcelId("PB-CHD-000128")) {
            parcelRepository.save(Parcel.builder()
                .parcelId("PB-CHD-000128")
                .ulpin("CHD-ULP-000128")
                .surveyNumber("SV-2024-001")
                .khasraNumber("KH-45/2")
                .khataNumber("KH-889")
                .village("Manimajra")
                .tehsil("Chandigarh")
                .district("Chandigarh")
                .state("Chandigarh")
                .areaSqM(new BigDecimal("850.75"))
                .landUse("RESIDENTIAL")
                .status("ACTIVE")
                .riskScore(new BigDecimal("15.50"))
                .centerLat(30.7333)
                .centerLng(76.7794)
                .build());
        }

        if (!parcelRepository.existsByParcelId("PB-CHD-000129")) {
            parcelRepository.save(Parcel.builder()
                .parcelId("PB-CHD-000129")
                .ulpin("CHD-ULP-000129")
                .surveyNumber("SV-2024-002")
                .khasraNumber("KH-45/3")
                .khataNumber("KH-890")
                .village("Manimajra")
                .tehsil("Chandigarh")
                .district("Chandigarh")
                .state("Chandigarh")
                .areaSqM(new BigDecimal("1200.00"))
                .landUse("COMMERCIAL")
                .status("ACTIVE")
                .riskScore(new BigDecimal("25.00"))
                .centerLat(30.7345)
                .centerLng(76.7805)
                .build());
        }

        if (!parcelRepository.existsByParcelId("RJ-JP-000456")) {
            parcelRepository.save(Parcel.builder()
                .parcelId("RJ-JP-000456")
                .ulpin("JP-ULP-000456")
                .surveyNumber("SV-2023-078")
                .khasraNumber("KH-12/1")
                .khataNumber("KH-2234")
                .village("Jagatpura")
                .tehsil("Jaipur")
                .district("Jaipur")
                .state("Rajasthan")
                .areaSqM(new BigDecimal("2500.00"))
                .landUse("AGRICULTURAL")
                .status("ACTIVE")
                .riskScore(new BigDecimal("10.00"))
                .centerLat(26.9124)
                .centerLng(75.7873)
                .build());
        }

        log.info("Dev data initialized: {} parcels loaded", parcelRepository.count());
    }
}
