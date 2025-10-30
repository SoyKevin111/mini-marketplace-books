package com.example.service.controller;

import com.example.service.entity.Book;
import com.example.service.service.BookService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/books")
@RestController
public class BookController {

   private final BookService bookService;

   public BookController(BookService bookService) {
      this.bookService = bookService;
   }

   @PostMapping
   public Book create(@RequestBody Book book) {
      return this.bookService.create(book);
   }

   @GetMapping
   public Page<Book> findAll(
      @RequestParam(defaultValue = "1") int page,
      @RequestParam( defaultValue = "10") int size
   ) {
      return this.bookService.findAllByPage( PageRequest.of(page, size));
   }

   @GetMapping("/{id}")
   public Book findById(@PathVariable Long id) {
      return this.bookService.findById(id);
   }

   @PutMapping("/{id}")
   public Book update(@PathVariable Long id, @RequestBody Book book) {
      return this.bookService.update(id, book);
   }

   @DeleteMapping("/{id}")
   public void delete(@PathVariable Long id) {
      this.bookService.delete(id);
   }

}
