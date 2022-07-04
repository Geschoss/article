calcChange owed given =
  if change > 0
    then change
    else 0
  where
    change = given - owed

inc n = n + 1
double n = n * 2
square n = n * 3

main = do
  print (calcChange 20 100)