SELECT row_to_json(row)
FROM (
    SELECT name, username, post_score, comment_score FROM user_metadata WHERE username=${username} LIMIT 1
) AS row;


