INCFLAGS 	= -I dependencies/include

FRAMEWORKS  = -framework OpenGL
# FRAMEWORKS += -framework Cocoa
# FRAMEWORKS += -framework IOKit
# FRAMEWORKS += -framework CoreVideo
# FRAMEWORKS += -framework CoreFoundation

LINKFLAGS  = -L dependencies/library

FILES      = dependencies/library/glad.c
FILES		  += dependencies/library/libglfw.3.3.dylib
FILES		  += dependencies/library/libvecmath.so

CFLAGS    = -O2
CC        = g++
CCSTD			= --std=c++17
SRCS      = main.cpp
OBJS      = $(SRCS:.cpp=.o)
PROG      = app
# W					= -w
W					= 

all: $(SRCS) $(PROG)

$(PROG): $(OBJS)
	$(CC) $(W) $(CCSTD) $(CFLAGS) $(FILES) build/$(OBJS) -o build/$@ $(INCFLAGS) $(FRAMEWORKS) $(LINKFLAGS)

.cpp.o:
	$(CC) $(W) $(CCSTD) $(CFLAGS) $< -c -o build/$@ $(INCFLAGS) $(FRAMEWORKS)

depend:
	makedepend $(INCFLAGS) -Y $(SRCS)

run:
	./build/app

clean:
	rm -rf build/*

