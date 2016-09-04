SELECT row_to_json(post) AS posts from post WHERE post_id=$1;

SELECT 
        json_build_object(
                'post_id', p.post_id,
                'vote_up', p.vote_up,
                'title', p.title,
                'votes', json_build_object(
                        'votes', v.votes
    )) AS post
from post p
inner join votes v on v.username = 'eminem2008' AND v.post_id = p.post_id;


SELECT 
        json_build_array() AS posts
from post p
inner join votes v on v.username = 'eminem2008' AND v.post_id = p.post_id;

