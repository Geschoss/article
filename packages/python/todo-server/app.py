from flask import Flask
app = Flask(__name__)


def readFile(fileName):
    f = open(fileName, "r")
    return f.read()


def writeFile(fileName, word):
    f = open(fileName, "a")
    f.write("\n")
    f.write(word)
    f.close()


@app.route("/")
def index():
    return "main"


@app.route("/todo")
def todo():
    result = readFile("todo.txt")
    return result
