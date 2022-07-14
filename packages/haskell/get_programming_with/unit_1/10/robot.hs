robot (name, attack, hp) = \message -> message (name, attack, hp)

name (n, _, _) = n

getName aRobot = aRobot name

setName aRobot newName = aRobot (\(n, a, h) -> robot (newName, a, h))

attack (_, a, _) = a

getAttack aRobot = aRobot attack

setAttack aRobot newAttack = aRobot (\(n, a, h) -> robot (n, newAttack, h))

hp :: (a, b, c) -> c
hp (_, _, hp) = hp

getHP aRobot = aRobot hp

setHP aRobot newHP = aRobot (\(n, a, h) -> robot (n, a, newHP))

printRobot aRobot =
  aRobot
    ( \(n, a, h) ->
        n
          ++ " attack:"
          ++ (show a)
          ++ " hp:"
          ++ (show h)
    )

damage aRobot attackDamage = aRobot (\(n, a, h) -> robot (n, a, h - attackDamage))

fight aRobot defender = damage defender attack
  where
    attack =
      if getHP aRobot > 10
        then getAttack aRobot
        else 0

oneRound (a, b) = playround (fight a b)
  where
    playround damagedb = (fight damagedb a, damagedb)

threeRoundFight a b = oneRound (a, b)