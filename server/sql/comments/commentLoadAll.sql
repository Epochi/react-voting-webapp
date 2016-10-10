WITH RECURSIVE cte (comment_id, data, date, author, sort_path, path, parent_id, depth, vote_up)  AS (
    SELECT  comment_id,
        data,
        date,
        author,
        array[-vote_up,comment_id] AS sort_path,
        path,
        parent_id,
        0 AS depth,
        vote_up
    FROM    comment
    WHERE   parent_id=0 AND post_id=${post_id}

    UNION ALL

    SELECT  comment.comment_id,
        comment.data,
        comment.date,
        comment.author,
        cte.sort_path || -comment.vote_up || comment.comment_id AS sort_path,
        comment.path,
        comment.parent_id,
        cte.depth + 1 AS depth,
        comment.vote_up
    FROM    comment
    JOIN cte ON comment.parent_id = cte.comment_id
    )
    SELECT comment_id, data,date, author,sort_path, path, depth,vote_up FROM cte
ORDER BY sort_path;