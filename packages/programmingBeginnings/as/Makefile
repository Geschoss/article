ARTICLE = 3.0

MAKEFLAGS += --silent

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

create_article:
	if [ ! -d "${ARTICLE}" ]; then \
	 mkdir ${ARTICLE}; \
	fi


create: create_article
	touch ${ARTICLE}/${name}.asm

run: create_build
	./${ARTICLE}/build/${name}

clean:
	rm -rf ${ARTICLE}/build

compile: create_build
	nasm -f arm64 ${ARTICLE}/$(name).asm -o ${ARTICLE}/build/$(name).o

link:
	ld ${ARTICLE}/build/$(name).o -o ${ARTICLE}/build/$(name)

all: compile link run clean