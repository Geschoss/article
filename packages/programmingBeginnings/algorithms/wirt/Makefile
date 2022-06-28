# make settings
MAKEFLAGS += --silen

# project settings
ARTICLE = 1.4

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

create_article:
	if [ ! -d "${ARTICLE}" ]; then \
	 mkdir ${ARTICLE}; \
	fi

run: create_build
	./${ARTICLE}/build/$(name)

compile: create_build
	fpc ${ARTICLE}/$(name).pas -o"${ARTICLE}/build/$(name)"

clean:
	rm ${ARTICLE}/build/$(name) ${ARTICLE}/build/$(name).o

all: compile run clean

create: create_article
	touch ${ARTICLE}/${name}.pas \
	&& code ${ARTICLE}/${name}.pas

