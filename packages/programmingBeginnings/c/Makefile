# make settings
MAKEFLAGS += --silen

# project settings
ARTICLE = 5.0

# compile settings
COMPILES_FLAGS = -Wall -g -lm

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

build: create_build
	clang ${COMPILES_FLAGS} ${ARTICLE}/${name}.c -o ${ARTICLE}/build/${name}

exec:
	./${ARTICLE}/build/${name}

clean:
	rm -rf ${ARTICLE}/build

all: build exec clean

run: build exec
