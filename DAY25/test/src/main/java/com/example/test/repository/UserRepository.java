package com.example.test.repository;

import com.example.test.dto.UserDTO;
import com.example.test.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    List<User> findByName(String name);
    @Query("select new com.example.test.dto.UserDTO(u.id, u.name, u.email, u.phone, u.address, u.avatar) from User u")
    List<UserDTO> findAllUserDTO();

    @Query("select new com.example.test.dto.UserDTO(u.id, u.name, u.email, u.phone, u.address, u.avatar) from User u " +
            "where upper(u.name) like ?1 "
    )
    List<UserDTO> findUserDTOByNameContainsIgnoreCase(String name);
}
