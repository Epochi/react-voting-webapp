SELECT row_to_json(post) as post FROM post WHERE subport=${subport} ORDER BY ${sort}::text DESC LIMIT 10 OFFSET (${page} * 10);
