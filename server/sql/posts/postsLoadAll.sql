SELECT row_to_json(post) as post from post ORDER BY ${sort}::text DESC LIMIT 10 OFFSET (${page} * 10);

