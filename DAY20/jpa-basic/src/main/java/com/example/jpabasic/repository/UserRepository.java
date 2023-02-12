package com.example.jpabasic.repository;

import com.example.jpabasic.dto.UserDTO;
import com.example.jpabasic.dto.UserInfo;
import com.example.jpabasic.dto.UserInfo;
import com.example.jpabasic.entity.User;
import jakarta.persistence.NamedQuery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  List<User> findByName (String name);

  List<User> findByNameContainingIgnoreCase(String name);

  List<User> findByAgeGreaterThan(Integer age);

  boolean existsByEmail(String email);

  long countByAgeBetween(Integer min, Integer max);

  Optional<User> findByEmail(String email);

  // JPQL Query : JPA Query Language

  @Query(value = "select u from User u where u.name = ?1")
  List<User> findByNameJPQL ( String name);

  @Query(value = "select u from User u where u.name = :emailValue")
  Optional<User> findByEmailJPQL (@Param("emailValue") String email);

  @Query(value = "select count(u) from User u where u.age between ?1 and ?2")
  long countByAgeBetweenJPQL (Integer min, Integer max);

  @Query(nativeQuery = true, value = "select * from user u where u.name = :nameValue")
  List<User> findByNameNative (@Param("nameValue") String name);

  // Update
  @Transactional
  @Modifying
  @Query(nativeQuery = true, value = "update user u set u.name = ?2 where u.id = ?1")
  int updateNameUser(Integer id, String name);

//  @Query(name = "User.findByAge")
//  List<User> findByAgeJPQL (Integer age);

  // Lấy DTO
  @Query("select new com.example.jpabasic.dto.UserDTO(u.id, u.name, u.email) from User u where u.email like %:email%")
  List<UserDTO> findByEmailContainingIgnoreCase (@Param("email") String email);

  List<User> findByNameStartsWith (String prefix);

  @Query(name = "findAllUserDTO", nativeQuery = true)
  List<UserDTO> findAllUserDTO();

  // Sử dụng proejection
//  @Query("select u from User u")
  List<UserInfo> findUserInfoById(Integer id);
}
