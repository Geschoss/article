import Data.List

doubleDouble x = (* 2) (x * 2)

overwrite x = (\x -> (\x -> (\x -> x) 1) 3) 2

ifEven fn n =
  if even n
    then fn n
    else n

inc n = n + 1

ifEvenInc = ifEven inc

author = ("Will", "Kurt")

names =
  [ ("Ian", "Curtis"),
    ("Bernard", "Sumner"),
    ("Peter", "Hool"),
    ("Stephen", "Morris")
  ]

compareLastNames name1 name2
  | lastName1 > lastName2 = GT
  | lastName1 < lastName2 = LT
  | firstName1 > firstName2 = GT
  | firstName1 < firstName2 = LT
  | otherwise = EQ
  where
    lastName1 = snd name1
    lastName2 = snd name2
    firstName1 = fst name1
    firstName2 = fst name2

addressLetter name location = nameText ++ " - " ++ location
  where
    nameText = fst name ++ " " ++ snd name

hoc fn n = fn n

myHoc = hoc (\x -> x + 2)

sfOffice name =
  if lastName < "L"
    then nameText ++ " - PO Box 1234 - San Francisco, CA, 94111"
    else nameText ++ " - Po Box 1010 - San Francisco, CA, 94109"
  where
    lastName = snd name
    nameText = fst name ++ " " ++ lastName

nyOffice name = nameText ++ ": PO Box 789 - New York, NY, 100013"
  where
    nameText = fst name ++ " " ++ snd name

renoOffice name = nameText ++ " - PO Box 456 - Reno, NV 89523"
  where
    nameText = snd name

getLocationFunction location = case location of
  "ny" -> nyOffice
  "sf" -> sfOffice
  "reno" -> renoOffice
  _ -> (\name -> fst name ++ " " ++ snd name)

addressLetter2 name location = locationFn name
  where locationFn = getLocationFunction location

main = do
  print (ifEven (* 2) 4)
  print (fst author)