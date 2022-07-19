main = do
  print "1"

(\\) :: Eq a => [a] -> [a] -> [a]
us \\ vs = filter (/= vs) us

minfree :: [a] -> a
minfree xs = head ([0 ..] \\ xs)