import Data.List

main = do
  print "lesson 14"
  print ME

data NewEngland = ME | VT | NH

instance Show NewEngland where
  show ME = "Method"
  show VT = "Vetro"
  show NH = "New Hobot"

instance Eq NewEngland where
  (==) ME ME = True
  (==) VT VT = True
  (==) NH NH = True
  (==) _ _ = False

instance Ord NewEngland where
  compare ME ME = EQ
  compare ME _ = GT
  compare _ ME = LT
  compare VT VT = EQ
  compare VT _ = GT
  compare _ VT = LT
  compare NH NH = EQ

data Name = Name (String, String) deriving (Show, Eq)

names :: [Name]
names = [Name ("Emil", "Cioran"), Name ("Eugene", "Thacker"), Name ("Friedrich", "Nierzsche")]

instance Ord Name where
  compare (Name (f1, l1)) (Name (f2, l2)) = compare (l1, f1) (l2, f2)

data FiveSidedDie = S1 | S2 | S3 deriving (Show)

class Die a where
  die :: a -> String

instance Die FiveSidedDie where
  die a = "I die " ++ show a