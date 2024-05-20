package com.revature.daos;

import com.revature.models.Collection;
import com.revature.models.CollectionKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionDAO extends JpaRepository<Collection, CollectionKey> {
    //@Query("SELECT * FROM collections WHERE user_id = :userId")
    List<Collection> findByIdUserId(int userId);

}
