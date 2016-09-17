EXPLAIN ANALYZE
WITH RECURSIVE q AS
(
  SELECT  parent_id, comment_id, vote_up, data, path
  FROM  comment c
  WHERE post_id=4 AND parent_id=0
  UNION ALL
  SELECT  sub.parent_id, sub.comment_id, sub.vote_up, sub.data, sub.path
  FROM  q
    JOIN  comment sub
      ON  sub.parent_id = q.comment_id
)
SELECT json_agg(
    json_set(q, )
) as comment
FROM q;

EXPLAIN ANALYZE
WITH RECURSIVE q AS
(
  SELECT  parent_id, comment_id, vote_up, data,1 as level, path
  FROM  comment c
  WHERE post_id=4 AND parent_id=0
  UNION ALL
  SELECT  sub.parent_id, sub.comment_id, sub.vote_up, sub.data,level + 1, sub.path
  FROM  q
    JOIN  comment sub
      ON  sub.parent_id = q.comment_id
)
SELECT  parent_id, comment_id, vote_up,score, data,level, path
FROM q;





WITH RECURSIVE c AS (
    SELECT *
    FROM comment
    WHERE post_id=4 AND parent_id=0
  UNION ALL
    SELECT node.*, c.lvl + 1 as lvl
    FROM node
    JOIN c ON ltree2text(subpath(node.path,nlevel(node.path)-2 ,nlevel(node.path))) = CONCAT(subpath(c.path,nlevel(c.path)-1,nlevel(c.path)),'.',node.id)
),
maxlvl AS (
  SELECT max(lvl) maxlvl FROM c
),
j AS (
    SELECT c.*, json '[]' children
    FROM c, maxlvl
    WHERE lvl = maxlvl
  UNION ALL
    SELECT (c).*, json_agg(j) children FROM (
      SELECT c, j
      FROM j
      JOIN c ON ltree2text(subpath(j.path,nlevel(j.path)-2,nlevel(j.path))) = CONCAT(subpath(c.path,nlevel(c.path)-1,nlevel(c.path)),'.',j.id)
    ) v
    GROUP BY v.c
)
SELECT row_to_json(j)::text json_tree
FROM j
WHERE lvl = 1;




WITH RECURSIVE cq AS (
  SELECT  parent_id, comment_id, vote_up, data, path
  FROM  comment c
  WHERE post_id=4
), 
cp AS (
  SELECT  cq.parent_id, cq.comment_id, cq.vote_up, cq.data, cq.path
  FROM  cq  WHERE parent_id=0
),
ct AS (
    SELECT cp.parent_id, cp.comment_id, cp.vote_up, cp.data, cp.path, (select json_agg(cc)
            FROM (  SELECT  cq.parent_id, cq.comment_id, cq.vote_up, cq.data, cq.path
                    FROM  cq  WHERE parent_id=cp.comment_id) cc
        ) AS children 
    FROM cp
)
SELECT row_to_json(ct)
FROM ct;


WITH RECURSIVE c AS (
    SELECT *, 0 as lvl
    FROM comment
    WHERE post_id=4 AND parent_id=0
  UNION ALL
    SELECT comment.*, c.lvl + 1 as lvl
    FROM comment 
    JOIN c ON comment.parent_id = c.comment_id
),
maxlvl AS (
  SELECT max(lvl) maxlvl FROM c
),
-- accumulate children
j AS (
    SELECT c.*, json '[]' children -- at max level, there are only leaves
    FROM c, maxlvl
    WHERE lvl = maxlvl
  UNION ALL
    -- a little hack, because PostgreSQL doesn't like aggregated recursive terms
    SELECT (c).*, array_to_json(array_agg(j)) children
    FROM (
      SELECT c, j
      FROM j
      JOIN c ON j.parent_id = c.comment_id
    ) v
    GROUP BY v.c
)
-- select only root
SELECT row_to_json(j) comment_tree
FROM j
WHERE lvl = 0;


SELECT row_to_json(r) comment_tree
FROM (select parent_id,post_id,comment_id,author,path,score,vote_up,date,data,children from j WHERE lvl = 0) as r;

parent_id,post_id,comment_id,author,path,score,vote_up,date,data


WITH RECURSIVE c AS (
    SELECT *, 0 as lvl
    FROM comment
    WHERE post_id=4 AND parent_id=0
  UNION ALL
    SELECT comment.*, c.lvl + 1 as lvl
    FROM comment 
    JOIN c ON comment.parent_id = c.comment_id
),
maxlvl AS (
  SELECT max(lvl) maxlvl FROM c
),
-- accumulate children
j AS (
    SELECT c.*, json '[]' children -- at max level, there are only leaves
    FROM c, maxlvl
    WHERE lvl = maxlvl
  UNION ALL
    -- a little hack, because PostgreSQL doesn't like aggregated recursive terms
    SELECT (c).*, array_to_json(array_agg(j)) children
    FROM (
      SELECT c, j
      FROM j
      JOIN c ON j.parent_id = c.comment_id
    ) v
    GROUP BY v.c
)
-- select only root
SELECT row_to_json(j) comment_tree
FROM j
WHERE lvl = 0;


WITH RECURSIVE cte (comment_id, data, author, path, parent_id, depth)  AS (
    SELECT  comment_id,
        data,
        author,
        array[comment_id] AS path,
        parent_id,
        1 AS depth
    FROM    comment
    WHERE   parent_id=0 AND post_id=4

    UNION ALL

    SELECT  comment.comment_id,
        comment.data,
        comment.author,
        cte.path || comment.comment_id,
        comment.parent_id,
        cte.depth + 1 AS depth
    FROM    comment
    JOIN cte ON comment.parent_id = cte.comment_id
    )
    SELECT comment_id, data, author, path, depth FROM cte
ORDER BY path;