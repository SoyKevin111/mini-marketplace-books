package com.example.service.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity(name = "book")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Book {

   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long id;

   @Column(nullable = false)
   private String title;
   @Column(nullable = false)
   private String author;
   @Enumerated(EnumType.STRING)
   @Column(nullable = false)
   private Genre genre;
   @Column(nullable = false)
   private LocalDate publishedAt;
   @Column(nullable = false)
   private String imageUrl;
   @Column(nullable = false)
   private boolean fav;
}
