package com.example.service.repository;

import com.example.service.entity.Book;
import com.example.service.entity.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookRepository extends JpaRepository<Book, Long> {
   @Query("""
          SELECT b FROM book b
          WHERE (:genre IS NULL OR b.genre = :genre)
           AND (:author IS NULL OR LOWER(b.author) = LOWER(CAST(:author AS string)))
      """)
   Page<Book> findByGenreOrAuthor(
      @Param("genre") Genre genre,
      @Param("author") String author,
      Pageable pageable
   );

   @Query("SELECT b.author FROM book b")
   List<String> findAllAuthors();

   @Query("""
          SELECT b FROM book b
          WHERE b.fav = true
          AND (
              (:genre IS NOT NULL OR :author IS NOT NULL)
              AND (:genre IS NULL OR b.genre = :genre)
              AND (:author IS NULL OR LOWER(b.author) = LOWER(CAST(:author AS string)))
          )
      """)
   Page<Book> findFavoritesByGenreOrAuthor(
      @Param("genre") Genre genre,
      @Param("author") String author,
      Pageable pageable
   );

}
