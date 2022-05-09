SELECT o.ord_id, o.ord_an, a.an_name, g.gr_temp
FROM Orders o
JOIN Analysis a
ON o.ord_an = a.an_id
JOIN Groups g
ON a.an_group = g.gr_id
WHERE g.gr_temp = 22