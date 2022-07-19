main = do
  print "lesson 13"

addThenDouble :: Num a => a -> a -> a
addThenDouble x y = (x + y) * 2

class TypeName a where
  fun1 :: a -> a
  fun2 :: a -> String
  fun3 :: a -> a -> Bool

class Describable a where
  describe :: a -> String

-- class MyEq a where
--   (==) :: a -> a -> Bool
--   (/=) :: a -> a -> Bool

data Icecream = Chocolate | Vanilla deriving (Show, Eq, Ord)

inc :: Int -> Int
inc x = x + 1

-- mysucc :: Enum a => a -> a
-- mysucc x = x + 1

cycleSucc :: (Bounded a, Enum a, Eq a) => a -> a
cycleSucc n =
  if n == maxBound
    then minBound
    else succ n