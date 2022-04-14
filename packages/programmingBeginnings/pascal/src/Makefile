ARTICLE = 2.5

run:
	fpc ${ARTICLE}/$(name).pas -o"${ARTICLE}/build/$(name)" \
	&& ./${ARTICLE}/build/$(name) \
	&& rm ${ARTICLE}/build/$(name) ${ARTICLE}/build/$(name).o

compile:
	fpc ${ARTICLE}/$(name).pas -o"${ARTICLE}/build/$(name)"

create:
	touch ${ARTICLE}/${name}.pas \
	&& code ${ARTICLE}/${name}.pas