-- List

main = do
  print "List"
  print ([1, 2, 3] !! 1)
  print ((!!) [1, 2, 3] 2)
  print (length [1 .. 20])
  print (reverse [1, 2, 3])
  print (isPalindrom "abba")
  print (12 `elem` [0, 12 .. 100])
  print (respond "hello")
  print (respond "hello!")
  print (take 5 [2, 4 .. 100])
  print (takeLast 10 [1 .. 100])
  print (drop 2 [1, 2, 3, 4, 5])
  print (zip [1, 2, 3] [2, 4, 6])
  print (ones 4)
  print (assignToGroups 3 ["file1.txt", "file2.txt", "file3.txt"])
  print (take 4 (myRepeat 2))
  print (subseq 2 5 [1 .. 10])
  print (subseq 2 7 "a puppy")
  print (inFirstHalf 'p' "a puppy")
  print (inFirstHalf 5 [1..10])

isPalindrom word = word == reverse word

respond phrase =
  if '!' `elem` phrase
    then "wow!"
    else "uh.. okay"

takeLast n aList = reverse (take n (reverse aList))

ones n = take n (cycle [1])

assignToGroups n = zip groups
  where
    groups = cycle [1 .. n]

myRepeat :: Int -> [Int]
myRepeat n = cycle [n]

subseq start end aList = take (end - start) (drop start aList)

inFirstHalf w aList = w `elem` take half aList
  where
    half = length aList `div` 2
