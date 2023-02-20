package com.example.demo.service;

import com.example.demo.entity.Image;
import com.example.demo.entity.User;
import com.example.demo.exception.NotFoundException;
import com.example.demo.repository.ImageRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.exception.BadRequestException;
import com.example.demo.response.ImageResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class ImageService {

  @Autowired
  private ImageRepository imageRepository;
  @Autowired
  private UserRepository userRepository;

  public List<String> getAllImage() {
    Integer userId = 1;
    List<Image> images = imageRepository.findByUser_IdOrderByUser_CreatedAtDesc(userId);
    return images.stream().map(image -> "/api/v1/images/" + image.getId()).toList();
  }

  public byte[] readImage(int id) {
    Image image = imageRepository.findById(id).orElseThrow(() -> new NotFoundException("image Id not found " + id));

    return image.getData();
  }

  public ImageResponse uploadImage(MultipartFile file) {
    Integer userId = 1;
    User user = userRepository.findById(userId).orElseThrow(() -> new NotFoundException("User Id not found"));

    // Validate file

    boolean checkPdf = validateFile(file);
    try {
      Image image = Image.builder()
              .data(file.getBytes())
              .user(user)
              .build();
      imageRepository.save(image);
//      return new ImageResponse("test");
      if (!checkPdf) {
        return new ImageResponse("api/v1/images/" + image.getId().toString());
      } else {
        return new ImageResponse("api/v1/images/pdf/" + image.getId().toString());
      }

    } catch (IOException e) {
      throw new RuntimeException("Upload image error");
    }


  }

  private boolean validateFile(MultipartFile file) {
    // Kiểm tra tên file
    String fileName = file.getOriginalFilename();
    if (fileName == null || fileName.isEmpty()) {
      throw new BadRequestException("file không không được để trống");
    }

    // image.png -> png
    // avatar.jpg -> jpg
    // Kiểm tra đuôi file (jpg, png, jpeg)
    String fileExtension = getFileExtensiton(fileName);
    if (!checkFileExtension(fileExtension)) {
      if (!checkPdfExtension(fileExtension)) {
        // kiểm tra đuôi file pdf
        throw new BadRequestException("file không đúng định dạng");
      } else {
        double fileSize = (double) (file.getSize() / 1_048_576);
        if (fileSize > 50) {
          throw new BadRequestException("file không được vượt quá 2MB");
        }
        return true;
      }
    }

    // Kiểm tra dung lượng file (<= 2MB)
    double fileSize = (double) (file.getSize() / 1_048_576);
    if (fileSize > 2) {
      throw new BadRequestException("file không được vượt quá 2MB");
    }
    return false;
  }

  private String getFileExtensiton(String fileName) {
    int lastIndexOf = fileName.lastIndexOf(".");
    return fileName.substring(lastIndexOf + 1);
  }

  private boolean checkFileExtension(String fileExtension) {
    List<String> extensions = new ArrayList<>(List.of("png", "jpg", "jpeg"));
    return extensions.contains(fileExtension.toLowerCase());
  }

  public void deleteImage(Integer id) {
    Image image = imageRepository.findById(id).orElseThrow(() -> new NotFoundException("image Id not found " + id));
    imageRepository.delete(image);
  }


  private boolean checkPdfExtension(String fileExtension) {
    return fileExtension.equalsIgnoreCase("pdf");
  }
}
