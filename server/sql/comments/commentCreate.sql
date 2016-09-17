WITH cc AS (
    UPDATE post SET comment_count = comment_count+1 WHERE post_id=${post_id}
    RETURNING comment_count AS comment_id
), cd AS (
    SELECT b.comment_id,f.* FROM cc b,( VALUES  (${parent_id},${post_id}, ${author}, ${path}, ${data})) AS f (parent_id, post_id, author, path, data)
)
insert into comment (comment_id, parent_id, post_id,author, path, data)
SELECT CAST(comment_id AS integer),CAST(parent_id AS integer),CAST(post_id AS integer),CAST(author AS text),
CAST(path || '.' || comment_id AS ltree) ,CAST(data AS jsonb) from cd;