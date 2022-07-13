mydrop 0 xs = xs
mydrop n [] = []
mydrop n (x : xs) = mydrop (n -1) xs

mylength [] = 0
mylength (x : xs) = 1 + mylength xs

mytake 0 _ = []
mytake n [] = []
mytake n (x : xs) = x : mytake (n - 1) xs

mycycle [] = []
mycycle (first : rest) = first : mycycle (rest ++ [first])

ackerman 0 n = n + 1
ackerman m 0 = ackerman (m - 1) 1
ackerman m n = ackerman (m - 1) (ackerman m (n - 1))

collatz 1 = 1
collatz n =
  if even n
    then 1 + collatz (n `div` 2)
    else 1 + collatz (n * 3 + 1)

myrevers [] = []
myrevers (x : xs) = (myrevers xs) ++ [x]

main = do
  let arr = [1, 2, 3, 4, 5]
  print "lesson 8"
  print (mydrop 2 arr)
  print (mylength arr)
  print (mytake 2 arr)
  print (mytake 20 (mycycle [1, 2, 3]))
  print (ackerman 3 3)
  print (collatz 6)
  print (map collatz [100 .. 150])
  print (myrevers [1, 2, 3])
