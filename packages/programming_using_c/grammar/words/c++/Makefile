CC=g++
CFLAGS=-c -Wall -std=c++20
LDFLAGS=

SOURCES=main.cpp
OBJECTS=$(SOURCES:.cpp=.o)
EXECUTABLE=main

run: all execute clean 

all: $(SOURCES) $(EXECUTABLE)
	
$(EXECUTABLE): $(OBJECTS) 
	$(CC) $(LDFLAGS) $(OBJECTS) -o $@

.cpp.o:
	$(CC) $(CFLAGS) $< -o $@ -I include

execute:
	./$(EXECUTABLE)

clean:
	rm -rf *.o $(EXECUTABLE)