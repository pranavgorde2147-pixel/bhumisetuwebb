package com.bhumisetu.document;

import com.bhumisetu.parcel.Parcel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByParcel(Parcel parcel);
    List<Document> findByParcelId(Long parcelId);
    Optional<Document> findByDocumentId(String documentId);
}
