select DISTINCT an_name
from Analysis
where an_id NOT IN (
  select ord_an
  from Orders
  where Orders.ord_datetime between '2020-05-01' and '2020-05-03'
);

