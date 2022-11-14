package vn.techmaster.firstweb.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import vn.techmaster.firstweb.exception.NotFoundException;
import vn.techmaster.firstweb.model.Book;
import vn.techmaster.firstweb.repository.BookRepository;
import vn.techmaster.firstweb.request.UpsertBookRequest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;
//    private List<Book> books;
//
//    public BookService() {
//        books = new ArrayList<>();
//        books.add(new Book(1, "Book1", "Des1", 2022));
//        books.add(new Book(2, "Book2", "Des2", 2021));
//        books.add(new Book(3, "Book3", "Des3", 2025));
//        books.add(new Book(4, "Book4", "Des4", 2024));
//        books.add(new Book(5, "Book5", "Des5", 2023));
//
//    }

    public List<Book> getBooks() {

        return bookRepository.findAll();
    }

    public Book getBookById(int id) {
        return bookRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Not found book with id=\" + id"));
//        if (bookOptional.isPresent()) {
//            return bookOptional.get();
//        }else {
//            throw new NotFoundException("Not found book with id=" + id);
//        }
    }

    public Book createBook(UpsertBookRequest request) {
        Random rd = new Random();
        int id = rd.nextInt(1000);

        Book book = new Book(
                id,
                request.getTitle(),
                request.getDescription(),
                request.getPublishYear()
        );
        bookRepository.save(book);
        return book;
    }

    public Book updateBook(int id, UpsertBookRequest request) {
        Book book = bookRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Not found book with id=\" + id"));;

        book.setTitle(request.getTitle());
        book.setDescription(request.getDescription());
        book.setPublishYear(request.getPublishYear());
        return book;

    }

//    public void deleteBook(int id) {
////        Book book = getBookById(id);
////        books.remove(book);
//
//    }

    public void deleteBookById(int id) {
        Book book = bookRepository
                .findById(id)
                .orElseThrow(() -> new NotFoundException("Not found book with id=\" + id"));
        bookRepository.deleteBook(book);
    }
}
