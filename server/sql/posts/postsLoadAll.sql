SELECT json_agg(p) as posts from (SELECT * from post ORDER BY ${sort^} DESC LIMIT 10 OFFSET (${page} * 10)) p;
