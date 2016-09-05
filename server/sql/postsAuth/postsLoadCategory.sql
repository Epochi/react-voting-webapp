SELECT json_agg(
        json_build_object('post_id', p.post_id,
                          'score', p.score,
                          'vote_up', p.vote_up,
                          'author', p.author,
                          'date', p.date,
                          'title',p.title,
                          'subport',p.subport,
                          'tags', p.tags,
                          'comment_count', p.comment_count,
                          'comments_update', p.comments_update,
                          'comments_update_time', p.comments_update_time,
                          'data', p.data,
                          'votes', v.votes
                        )
               ) AS posts
from (SELECT * from post WHERE subport=${subport} ORDER BY ${sort}::text DESC LIMIT 10 OFFSET ${page}) AS p
left join votes v on v.username = ${username} AND p.post_id = v.post_id;
