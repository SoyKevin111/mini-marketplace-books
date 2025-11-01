package com.example.service.service;

import com.example.service.entity.Book;
import com.example.service.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BookService {

   private final BookRepository bookRepository;

   public BookService(BookRepository bookRepository) {
      this.bookRepository = bookRepository;
   }

   public Book create(Book book) {
      try {
         return this.bookRepository.save(book);
      } catch (Exception e) {
         throw new RuntimeException("Error al crear el libro", e);
      }
   }

   public Page<Book> findAllByPage(Pageable pageable) {
      try {
         return this.bookRepository.findAll(pageable);
      } catch (Exception e) {
         throw new RuntimeException("Error al buscar los libros", e);
      }
   }

   public Book findById(Long id) {
      try {
         return this.bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Libro no encontrado"));
      } catch (Exception e) {
         throw new RuntimeException("Error al buscar el libro", e);
      }
   }

   public Book update(Long id, Book book) {
      try {
         Book bookToUpdate = this.bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Libro no encontrado"));
         bookToUpdate.setTitle(book.getTitle());
         bookToUpdate.setAuthor(book.getAuthor());
         bookToUpdate.setGenre(book.getGenre());
         bookToUpdate.setPublishedAt(book.getPublishedAt());
         bookToUpdate.setImageUrl(book.getImageUrl());
         bookToUpdate.setFav(book.isFav());
         return this.bookRepository.save(bookToUpdate);
      } catch (Exception e) {
         throw new RuntimeException("Error al actualizar el libro", e);
      }
   }

   public void delete(Long id) {
      try {
         this.bookRepository.deleteById(id);
      } catch (Exception e) {
         throw new RuntimeException("Error al eliminar el libro", e);
      }
   }

}
