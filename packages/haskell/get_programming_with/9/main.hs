main = do
  print "lesson 9"
  print (map reverse ["dog", "cat", "mouse"])
  print (map head ["dog", "cat", "mouse"])
  print (filter even [1, 2, 3, 4])
  print (sumOfSquares [1, 2, 3, 4])
  print (foldl (-) 0 [1, 2, 3, 4])
  print (foldr (-) 0 [1, 2, 3, 4])
  print (myelem 2 [1, 2, 3, 4])

add3ToAll [] = []
add3ToAll (x : xs) = (3 + x) : add3ToAll xs

mul3ByAll [] = []
mul3ByAll (x : xs) = (3 * x) : mul3ByAll xs

sumOfSquares xs = foldl (+) 0 (map (^ 2) xs)

myelem v xs =
  not (null has)
  where
    has = filter (== v) xs

