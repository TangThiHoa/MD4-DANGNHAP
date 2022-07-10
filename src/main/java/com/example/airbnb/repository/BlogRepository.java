package com.example.airbnb.repository;

import com.example.airbnb.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query(value = "select * from posts P join user_table U  on P.user_id = U.id where U.username like :name" , nativeQuery = true)
    Iterable<Blog> findAllByNameUser(@Param("name") String name);
}