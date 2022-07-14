main = do
  print "lesson 10"

cup floz = \message -> message floz

getOz aCup = aCup (\floz -> floz)

drink aCup ozDrank =
  if ozDiff >= 0
    then cup (floz - ozDrank)
    else cup 0
  where
    floz = getOz aCup
    ozDiff = floz - ozDrank

isEmpty aCup = getOz aCup == 0

-- Robot