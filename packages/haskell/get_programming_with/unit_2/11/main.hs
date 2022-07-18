main = do
  print "lesson 11"

x :: Int
x = 2

letter :: Char
letter = 'a'

interestRate :: Double
interestRate = 0.275

isFun :: Bool
isFun = True

values :: [Int]
values = [1, 2, 3]

testScores :: [Double]
testScores = [0.99, 0.7, 0.8]

letters :: [Char]
letters = ['a', 'b', 'c']

aPet :: [Char]
aPet = "cat"

ageAndHeight :: (Int, Int)
ageAndHeight = (34, 74)

firstLastMiddle :: (String, String, Char)
firstLastMiddle = ("Oscar", "Grouch", 'D')

streetAddres :: (Int, String)
streetAddres = (123, "Happy st.")

double :: Int -> Int
double n = n * 2

half :: Int -> Double
half n = (fromIntegral n) / 2

halve :: Integer -> Integer
halve value = value `div` 2

printDouble :: Int -> String
printDouble value = show (value * 2)

makeAddres :: Int -> String -> String -> (Int, String, String)
makeAddres number street town = (number, street, town)

ifEven :: (Int -> Int) -> Int -> Int
ifEven f n =
  if even n
    then f n
    else n

simple :: a -> a
simple x = x