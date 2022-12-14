package com.example.demo14.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Todo {
//  id : int - id của công việc
//  title : String - tiêu đề của công việc
//  status : boolean - trạng thái của công việc (hoàn thành - chưa hoàn thành)
  private int id;
  private String title;
  private boolean status;
}
