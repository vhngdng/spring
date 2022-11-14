package vn.techmaster.firstweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import vn.techmaster.firstweb.model.Book;
import vn.techmaster.firstweb.request.UpsertBookRequest;
import vn.techmaster.firstweb.service.BookService;

import java.util.List;

@RestController
@RequestMapping("api/v1") //Thay thế đường dẫn trùng
public class BookController {
    @Autowired //Inject bean
    private BookService bookService;

    // GET: api/v1/books : Lấy danh sách tất cả book
    @GetMapping("books")
    public List<Book> getBooks(){
        return bookService.getBooks();
    }

    // GET : api/v1/books/{id} : Lấy chi tiết 1 cuốn sách
    @GetMapping("books/{id}")
    public Book getBookById(@PathVariable int id){
        return bookService.getBookById(id);
    }

    // POST : api/v1/books : Tạo mới book -> Đối tượng sau khi tạo
    @PostMapping("books")
    public Book createBook(@RequestBody UpsertBookRequest request){
        return  bookService.createBook(request);
    }


    // PUT : api/v1/books/{id} : Cập nhật thông tin cuốn sách
    @PutMapping("books/{id}")
    public Book updateBookById(@PathVariable int id, @RequestBody UpsertBookRequest request){
        return bookService.updateBook(id, request);
    }

    // DELETE : api/v1/books/{id} : Xoá cuốn sách theo id
    @DeleteMapping("books/{id}")
    public void deleteBookById(@PathVariable int id){
        bookService.deleteBookById(id);
    }
}

