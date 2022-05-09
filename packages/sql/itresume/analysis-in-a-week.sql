-- Analysis Groups Orders
select an_name, an_cost, ord_datetime
from Orders
join Analysis on Analysis.an_id = Orders.ord_an
where ord_datetime BETWEEN '2020-02-05'
  and'2020-02-13'::TIMESTAMP + INTERVAL '1 week'
order by ord_datetime, an_cost;