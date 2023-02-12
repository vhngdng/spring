package com.example.jpabasic.entity;

import com.example.jpabasic.dto.UserDTO;
import com.example.jpabasic.dto.UserInfo;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.lang.annotation.Target;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "user")
@NamedQueries({
        @NamedQuery(name = "findByAge", query = "select u from User u where u.age = :age")
})

@SqlResultSetMappings(value = {
        @SqlResultSetMapping(
                name = "listUserDTO",
                classes = @ConstructorResult(
                        targetClass = UserDTO.class,
                        columns = {
                                @ColumnResult(name = "id", type = Integer.class),
                                @ColumnResult(name = "name", type=String.class),
                                @ColumnResult(name = "email", type=String.class)
                        }
                )
        )
})
@NamedNativeQuery(
        name = "findAllUserDTO",
        resultSetMapping = "listUserDTO",
        query = "select id, name, email from user")
public class User  {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  @Column(name = "name", nullable = false)
  private String name;
  @Column(name = "email", unique = true, nullable = false)
  private String email;
  @Column(name = "age")
  private Integer age;

}
