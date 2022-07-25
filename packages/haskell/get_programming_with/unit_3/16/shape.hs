data Circle = Circle
  { radius :: Int
  }

data Square = Square
  { side :: Int
  }

data Rectangle = Rectangle
  { width :: Int,
    height :: Int
  }

data Shape = CircleShape Circle | SquareShape Square | RectangleShape Rectangle

perimeter :: Shape -> Int
perimeter (CircleShape circle) = 2 * (radius circle)
perimeter (SquareShape square) = side square * 4
perimeter (RectangleShape rectangle) = width rectangle * height rectangle

shape = CircleShape Circle { radius = 12 }
main = do
  print "lesson 16"
  print (perimeter shape)