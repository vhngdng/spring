package vn.techmaster.firstweb.repository;

import org.springframework.stereotype.Repository;
import vn.techmaster.firstweb.database.FakeDB;
import vn.techmaster.firstweb.model.Book;

import java.util.List;
import java.util.Optional;

@Repository
public class BookRepository {
    public List<Book> findAll() {
        return FakeDB.books;
    }

    public Optional<Book> findById(int id) {
        return FakeDB.books
                .stream()
                .filter(book -> book.getId() == id)
                .findFirst();
    }

    public void save(Book book) {
        FakeDB.books.add(book);
    }

    public void deleteBook(Book book) {
        FakeDB.books.remove(book);
    }


}
