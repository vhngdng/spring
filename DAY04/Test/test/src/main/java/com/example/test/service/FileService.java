package com.example.test.service;

import com.example.test.exception.BadRequestException;
import com.example.test.exception.NotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Service
public class FileService {
  private Path roothPath = Paths.get("uploads");


  public FileService() {
    createFolder(roothPath.toString());
  }
  // /home/dung/Documents/springTechMaster/DAY04/Test/test
  private void createFolder(String path) {
    File file = new File(path);
    if(!file.exists()) {
      file.mkdirs();
    }
  }

  public String uploadFile(int id, MultipartFile file) {
    // Tao folder voi user id
    Path userPath = roothPath.resolve(String.valueOf(id));
    createFolder(userPath.toString());

    //Validate file
    validateFile(file);

    // Upload vao trong folder
    String fileId = String.valueOf(Instant.now().getEpochSecond());
    Path filePath = userPath.resolve(fileId);
    File targetFile = filePath.toFile();
    try (OutputStream os = new FileOutputStream(targetFile)) {
      os.write(file.getBytes());
    }catch (IOException e) {
      throw new RuntimeException("Loi trong qua trinh upload");
    }
    return "/api/v1/users/" + id + "/files/" + fileId;
  }

  private void validateFile(MultipartFile file) {
    // Kiem tra ten file
    String fileName = file.getOriginalFilename();
    if (fileName == null || file.isEmpty()) {
      throw new BadRequestException("file name khong duoc de trong");
    }
    // Kiem tra duoi file
    String fileExtension = getFileExtension(fileName);
    if(!checkFileExtension(fileExtension)) {
      throw new BadRequestException("File khong dung dinh dang");
    }
    // Kiem tra dung luong file (< 2MB)
    double fileSize = (double)(file.getSize() / 1_048_576);
    if (fileSize > 2) {
      throw new BadRequestException("file khong duoc vuot qua 2MB");
    }

  }


  private String getFileExtension (String fileName) {
    int lastIndexOf = fileName.lastIndexOf(".");
    return fileName.substring(lastIndexOf + 1);
  }

  private boolean checkFileExtension (String fileExtension) {
    List<String> extensions = new ArrayList<>(List.of("png", "jpg", "jpeg"));
    return extensions.contains(fileExtension);
  }


  public byte[] readFile(int id, String fileId) {
    Path userPath = roothPath.resolve(String.valueOf(id));
    Path filePath = userPath.resolve(fileId);
    if (!userPath.toFile().exists() || !filePath.toFile().exists()) {
      throw new NotFoundException("File khong ton tai");
    }

    try {
      return Files.readAllBytes(filePath);
    }catch (IOException e) {
      throw new RuntimeException("Loi trong qua trinh docfile");
    }

  }

  public List<String> getFiles(int id) {
    Path userPath = roothPath.resolve(String.valueOf(id));
    if (!userPath.toFile().exists()) {
      return new ArrayList<>();
    }

    File userDir = userPath.toFile();
    File[] files = userDir.listFiles();
    return Arrays.stream(files)
            .map(File::getName)
            .sorted(Comparator.reverseOrder())
            .map(fileName -> "/api/v1/users/" + id + "/files/" + fileName)
            .toList();
  }

  public void deleteFile(int id, String fileId) {
    Path userPath = roothPath.resolve(String.valueOf(id));
    Path filePath = userPath.resolve(fileId);
    if (!userPath.toFile().exists() || !filePath.toFile().exists()) {
      throw new NotFoundException("File khong ton tai");
    }
    if (!filePath.toFile().delete()) {
      throw new RuntimeException("Loi khi xoa file");
    }


  }
}
