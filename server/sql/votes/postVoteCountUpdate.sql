UPDATE post
    SET vote_up = vote_up + ${operator}
WHERE post_id=${post};