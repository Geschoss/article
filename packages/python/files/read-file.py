def readFile(fileName):
  f = open(fileName,"r")
  return f.readlines() 

def writeFile(fileName, word):
  f = open(fileName, "a")
  f.write("\n")
  f.write(word)
  f.close()

writeFile("todo.txt", "Быть красивой")
result = readFile("todo.txt")
print(result)


