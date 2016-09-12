SELECT json_build_object('post_id', p.post_id,
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
                        ) AS posts
from (SELECT * from post WHERE post_id=${post_id}) AS p
left join votes v on v.username = ${username} AND v.post_id=${post_id};
