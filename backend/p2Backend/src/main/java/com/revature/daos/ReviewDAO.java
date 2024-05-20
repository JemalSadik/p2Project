<<<<<<< ViewAllReplies
package com.revature.daos;

import com.revature.models.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewDAO extends JpaRepository<Review,Integer> {


//    @Modifying
//    @Transactional
//    @Query("delete from Review r where r.user.userId = :userId")
//    void deleteByReviewsUserId(int userId);

      List<Review> findByUser_Id(int Id);
}
=======
package com.revature.daos;

import com.revature.models.Review;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewDAO extends JpaRepository<Review,Integer> {


//    @Modifying
//    @Transactional
//    @Query("delete from Review r where r.user.userId = :userId")
//    void deleteByReviewsUserId(int userId);
    public List<Review> findAllByUserId(int Id);
}
>>>>>>> dev
