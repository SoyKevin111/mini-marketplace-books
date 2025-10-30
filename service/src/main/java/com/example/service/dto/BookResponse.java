package com.example.service.dto;

import com.example.service.entity.Genre;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class BookResponse {

   private Long id;
   private String title;
   private String author;
   private String genre;
   private LocalDate publishedAt;
   private String imageUrl;
   private boolean fav;

   public BookResponse(Long id, String title, String author, Genre genre, LocalDate publishedAt, String imageUrl, boolean fav) {
      this.id = id;
      this.title = title;
      this.author = author;
      this.genre = genre.getDisplayName();
      this.publishedAt = publishedAt;
      this.imageUrl = imageUrl;
      this.fav = fav;
   }
}
