package com.example.service.repository;

import com.example.service.entity.Book;
import com.example.service.entity.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
   Page<Book> findByGenre(Genre genre, Pageable pageable);
   Page<Book> findByAuthorIgnoreCase(String author, Pageable pageable);
   Page<Book> findByGenreAndAuthorIgnoreCase(Genre genre, String author, Pageable pageable);
   @Query("SELECT b.author FROM book b")
   List<String> findAllAuthors();
}
