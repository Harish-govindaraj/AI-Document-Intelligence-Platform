package com.docmind.backend.repository;

import com.docmind.backend.entity.Document;
import com.docmind.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DocumentRepository
        extends JpaRepository<Document, Long> {

    List<Document> findByUser(User user);

    Optional<Document> findByIdAndUser(Long id, User user);

}