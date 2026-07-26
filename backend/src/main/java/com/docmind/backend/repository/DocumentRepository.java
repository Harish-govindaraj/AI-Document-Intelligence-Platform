package com.docmind.backend.repository;

import com.docmind.backend.entity.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository
        extends JpaRepository<Document,Long>{

}