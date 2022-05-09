SELECT DISTINCT a.an_name
FROM Orders o
JOIN Analysis a
ON o.ord_an = a.an_id
WHERE a.an_name ilike '%кров%'