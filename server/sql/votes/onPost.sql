INSERT INTO votes (post_id, username, votes) VALUES (${post}, ${username}, ${vote}::jsonb) 
      ON CONFLICT ON CONSTRAINT vote_pkey DO UPDATE
      /*merge votes with new ones. it only leaves the latter ones*/
      SET votes = votes.votes || EXCLUDED.votes
      /* if given votes are found in the row, do nothing, returning 0 rows */
      WHERE NOT votes.votes <@ EXCLUDED.votes
      RETURNING *;