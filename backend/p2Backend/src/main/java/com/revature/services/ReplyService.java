package com.revature.services;


import com.revature.daos.ReplyDAO;
import com.revature.daos.ReviewDAO;
import com.revature.daos.UserDAO;
import com.revature.models.Reply;
import com.revature.models.dtos.ReplyDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReplyService {

    ReplyDAO replyDAO;
    UserDAO userDAO;
    ReviewDAO reviewDAO;

    @Autowired
    public ReplyService(ReplyDAO replyDAO, UserDAO userDAO, ReviewDAO reviewDAO) {
        this.replyDAO = replyDAO;
        this.userDAO = userDAO;
        this.reviewDAO = reviewDAO;
    }

    public Reply addReply(int userId, ReplyDTO reply) {
        Reply newReply = new Reply();
        newReply.setBody(reply.getBody());
        newReply.setUser(userDAO.findById(userId).orElseThrow(() -> new IllegalArgumentException("No user found for ID: " + userId)));
        newReply.setReview(reviewDAO.findById(reply.getReviewId()).orElseThrow(() -> new IllegalArgumentException("No review found for ID: " + reply.getReviewId())));
        return replyDAO.save(newReply);
    }

    /**
     * Deletes a reply identified by the specified ID.
     * If the reply does not exist, an IllegalArgumentException is thrown.
     *
     * @param id The ID of the reply to be deleted.
     * @throws IllegalArgumentException If the reply ID is not found.
     */
    public void deleteReply(int id) {

        Optional<Reply> oR = replyDAO.findById(id);
        if (oR.isEmpty()) {
            throw new IllegalArgumentException("Reply with ID " + id + " not found!");
        }
        replyDAO.deleteById(id);
    }
}
