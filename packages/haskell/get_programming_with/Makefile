# make settings
MAKEFLAGS += --silen

# project settings
UNIT = 2
ARTICLE = 1

# compile settings
# COMPILES_FLAGS = -Wall -g

create:
	touch unit_${UNIT}/${ARTICLE}/${name}.hs

create_build:
	if [ ! -d "unit_${UNIT}/${ARTICLE}/build" ]; then \
	 mkdir unit_${UNIT}/${ARTICLE}/build; \
	fi	

build: create_build
	ghc ${COMPILES_FLAGS} unit_${UNIT}/${ARTICLE}/${name}.hs -outputdir unit_${UNIT}/${ARTICLE}/build -o unit_${UNIT}/${ARTICLE}/build/${name}

run:
	./unit_${UNIT}/${ARTICLE}/build/${name}

clean:
	rm -rf unit_${UNIT}/${ARTICLE}/build

all: build run clean
