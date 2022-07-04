# make settings
MAKEFLAGS += --silen

# project settings
ARTICLE = 4_2

# compile settings
COMPILES_FLAGS = -Wall -g -lm

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

build: create_build
	clang ${COMPILES_FLAGS} ${ARTICLE}/${name}.c -o ${ARTICLE}/build/${name}

run:
	./${ARTICLE}/build/${name}

clean:
	rm -rf ${ARTICLE}/build

all: build run clean