SELECT json_agg(p) as posts from (SELECT * from post ORDER BY ${sort}::text DESC LIMIT 10 OFFSET (${page} * 10)) p;
