INCFLAGS		= -I /usr/local/include/GLFW
INCFLAGS		+= -I /usr/local/include/vecmath

FRAMEWORKS		= -framework Cocoa
FRAMEWORKS		+= -framework OpenGL
FRAMEWORKS		+= -framework IOKit
FRAMEWORKS		+= -framework CoreVideo
FRAMEWORKS		+= -framework GLUT

LINKFLAGS		= -L/usr/local/lib
LINKFLAGS		+= -lvecmath
LINKFLAGS		+= -lglfw
LINKFLAGS		+= -lglew



CFLAGS		= -O2
CC			= g++
CCSTD		= --std=c++17
W			= -w

SRCS		= src/main.cpp
PROG		= main
OBJ			= obj/
SRC			= src/
OBJS		=$(patsubst %.cpp, %.o, $(wildcard $(SRC)*.cpp))


all: $(SRCS) $(PROG)

$(PROG): $(OBJS)
	$(CC) $(W) $(CCSTD) $(CFLAGS) $(OBJS) -o $@ $(INCFLAGS) $(FRAMEWORKS) $(LINKFLAGS)

.cpp.o:
	$(CC) $(W) $(CCSTD) $(CFLAGS) $< -c -o $@ $(INCFLAGS) $(FRAMEWORKS)

depend:
	makedepend $(INCFLAGS) -Y $(SRCS)

clean:
	rm $(OBJS) $(PROG)
