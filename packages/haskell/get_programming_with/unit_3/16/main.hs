main = do
  print "lesson 16"

data BreakfastSide = Toast | Biscuit | Homefries | Fruit deriving (Show)

data BreakfastMeat = Sausage | Bacon | Ham deriving (Show)

data BreakfastMain = Egg | Pancake | Waffle deriving (Show)

type FirstName = String

type LastName = String

type MiddleName = String

data Name
  = Name FirstName LastName
  | NameWithMiddle FirstName MiddleName LastName
  | TwoInitialsWithLast Char Char LastName
  | FirstNameWithTwoInits FirstName Char Char

data Author = Author Name

data Artist = Person Name | Band String

data Creator = AuthorCreator Author | ArtistCreator Artist

data Book = Book
  { author :: Creator,
    isbn :: String,
    title :: String,
    year :: Int,
    bookPrice :: Double
  }

data VinylRecord = VinylRecord
  { artist :: Creator,
    recordTitle :: String,
    recordYear :: Int,
    recordPrice :: Double
  }

data CollectibleToy = CollectibleToy
  { name :: String,
    description :: String,
    toyPrice :: Double
  }

data StoreItem = BookItem Book | RecordItem VinylRecord | ToyItem CollectibleToy

hpLovecraft :: Creator
hpLovecraft = AuthorCreator (Author (TwoInitialsWithLast 'H' 'P' "Lovecraft"))

price :: StoreItem -> Double
price (BookItem book) = bookPrice book
price (RecordItem record) = recordPrice record
price (ToyItem toy) = toyPrice toy

madeBy :: StoreItem -> String
madeBy (BookItem book) = show (author book)
madeBy (RecordItem record) = show (artist record)
madeBy _ = "unknown"


