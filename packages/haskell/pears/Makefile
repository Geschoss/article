# make settings
MAKEFLAGS += --silen

# project settings
ARTICLE = 1

# compile settings
# COMPILES_FLAGS = -Wall -g

create:
	touch ${ARTICLE}/${name}.hs

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

build: create_build
	ghc ${COMPILES_FLAGS} ${ARTICLE}/${name}.hs -outputdir ${ARTICLE}/build -o unit_${UNIT}/${ARTICLE}/build/${name}

run:
	./${ARTICLE}/build/${name}

clean:
	rm -rf ${ARTICLE}/build

all: build run clean
