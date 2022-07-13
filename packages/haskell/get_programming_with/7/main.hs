import Data.Fixed

myTake n _ | n <= 0 = []
myTake _ [] = []
myTake n (x : xs) = x : myTake (n -1) xs

myGcd a b = if remainder == 0 then b else myGcd b remainder
  where
    remainder = a `mod` b

sayAmount n = case n of
  1 -> "one"
  2 -> "two"
  n -> "a bunch"

isEmpty [] = True
isEmpty _ = False

myHead (x : xs) = x
myHead [] = error "No head for empty list"

myTail (_: xs) = xs
myTail [] = []

main = do
  print "recursion"
  print (myTake 1 [1, 2, 3])
  print (myGcd 20 16)
  print (sayAmount 5)