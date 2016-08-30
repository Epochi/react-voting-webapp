INSERT INTO post (title, author, subport, tags, kind, data)
VALUES (${title}, ${author}, ${subport}, to_jsonb(${tags}), ${kind}, ${data})
RETURNING *;