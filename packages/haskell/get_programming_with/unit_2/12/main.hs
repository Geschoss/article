main = do
  print "lesson 12"
  putStrLn (patientSummary pavelK)

patientInfo :: PatientName -> Age -> Height -> String
patientInfo (fname, lname) age height = name ++ " " ++ ageHeight
  where
    name = fname ++ ", " ++ lname
    ageHeight = "(" ++ show age ++ " yers. " ++ show height ++ " in.)"

type FirstName = String

type LastName = String

type Age = Int

type Height = Int

type PatientName = (String, String)

firstName :: PatientName -> String
firstName patient = fst patient

lastName :: PatientName -> String
lastName patient = snd patient

data Sex = Male | Female

sexInitial :: Sex -> Char
sexInitial Male = 'M'
sexInitial Female = 'F'

data RhType = Pos | Neg

data ABOType = A | B | AB | O

data BloodType = BloodType ABOType RhType

patient1BT = BloodType A Pos

patient2BT = BloodType O Neg

patient3BT = BloodType AB Pos

showRh :: RhType -> String
showRh Pos = "+"
showRh Neg = "-"

showABO :: ABOType -> String
showABO A = "A"
showABO B = "B"
showABO AB = "AB"
showABO O = "O"

showBloodType :: BloodType -> String
showBloodType (BloodType abo rh) = showABO abo ++ showRh rh

canDonateTo :: BloodType -> BloodType -> Bool
canDonateTo (BloodType O _) _ = True
canDonateTo _ (BloodType AB _) = True
canDonateTo (BloodType A _) (BloodType A _) = True
canDonateTo (BloodType B _) (BloodType B _) = True
canDonateTo _ _ = False

type MiddleName = String

data Name
  = Name FirstName LastName
  | NameWithMiddle FirstName MiddleName LastName

showName :: Name -> String
showName (Name f l) = f ++ " " ++ l
showName (NameWithMiddle f m l) = f ++ " " ++ m ++ " " ++ l

name1 = Name "Jerome" "Salinger"

name2 = NameWithMiddle "Jerome" "David" "Salinger"

data Patient_old = Patient_old Name Sex Int Int Int BloodType

johnDoe :: Patient_old
johnDoe = Patient_old (Name "John" "Doe") Male 30 74 200 (BloodType AB Pos)

janeSmith = Patient_old (NameWithMiddle "Jane" "Elizabrth" "Smith") Female 33 60 200 (BloodType A Pos)

data Patient = Patient
  { name :: Name,
    sex :: Sex,
    age :: Int,
    height :: Int,
    weight :: Int,
    bloodType :: BloodType
  }

jackieSmith :: Patient
jackieSmith =
  Patient
    { name = Name "Jackie" "Smith",
      age = 43,
      sex = Female,
      height = 62,
      weight = 115,
      bloodType = BloodType O Neg
    }

pavelK =
  Patient
    { name = Name "Pavel" "Kolomnikov",
      age = 33,
      sex = Male,
      height = 72,
      weight = 175,
      bloodType = BloodType O Pos
    }

patientCanDonate :: Patient -> Patient -> Bool
patientCanDonate patient1 patient2 = canDonateTo (bloodType patient1) (bloodType patient2)

patientSummary :: Patient -> String
patientSummary patient =
  "**************" ++ "\n"
    ++ "Patient Name: "
    ++ printName (name patient)
    ++ "\n"
    ++ "Sex: "
    ++ printSex (sex patient)
    ++ "\n"
    ++ "Age: "

printName :: Name -> String
printName (Name f l) = f ++ ", " ++ l
printName (NameWithMiddle f m l) = f ++ ", " ++ m ++ ", " ++ l

printSex :: Sex -> String
printSex Male = "Male"
printSex Female = "Female"