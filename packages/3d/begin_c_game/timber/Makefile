INCFLAGS 	= -I dependencies/include

LIB_DIRS  = -L dependencies/lib
LIBS      = -lsfml-system -lsfml-window -lsfml-graphics -lsfml-audio -lsfml-network
LNK_FLAGS = $(LIB_DIRS) $(LIBS)

CFLAGS    = -O2
CC        = g++
CCSTD			= --std=c++17
SRCS      = main.cpp
OBJS      = $(SRCS:.cpp=.o)
PROG      = app
W					= -w

all: $(SRCS) $(PROG)

$(PROG): $(OBJS)
	$(CC) $(W) $(CCSTD) $(CFLAGS) $(LNK_FLAGS) build/$(OBJS) -o build/$@ $(INCFLAGS)

.cpp.o:
	$(CC) $(W) $(CCSTD) $(CFLAGS) $< -c -o build/$@ $(INCFLAGS)

depend:
	makedepend $(INCFLAGS) -Y $(SRCS)

run:
	./build/app

clean:
	rm -rf build/*

