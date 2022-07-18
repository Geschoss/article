# make settings
MAKEFLAGS += --silen

# project settings
UNIT = 1
ARTICLE = 2

# compile settings
COMPILES_FLAGS = -Wall -std=c++2a -stdlib=libc++ -lncurses -g

create_build:
	if [ ! -d "unit_${UNIT}/${ARTICLE}/build" ]; then \
	 mkdir unit_${UNIT}/${ARTICLE}/build; \
	fi	

build: create_build
	clang++ ${COMPILES_FLAGS} unit_${UNIT}/${ARTICLE}/${name}.cpp -o unit_${UNIT}/${ARTICLE}/build/${name}

exec:
	./unit_${UNIT}/${ARTICLE}/build/${name}

clean:
	rm -rf unit_${UNIT}/${ARTICLE}/build

all: build exec clean

run: build exec
