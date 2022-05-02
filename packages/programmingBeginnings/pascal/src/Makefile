ARTICLE = 2.11
args = $(foreach a,$($(subst -,_,$1)_args),$(if $(value $a),$a="$($a)"))

create_build:
	if [ ! -d "${ARTICLE}/build" ]; then \
	 mkdir ${ARTICLE}/build; \
	fi	

run: create_build
	echo argument is $(1) \
 	&& fpc ${ARTICLE}/$(name).pas -o"${ARTICLE}/build/$(name)" \
	&& ./${ARTICLE}/build/$(name) \
	&& rm ${ARTICLE}/build/$(name) ${ARTICLE}/build/$(name).o

compile:
	fpc ${ARTICLE}/$(name).pas -o"${ARTICLE}/build/$(name)"

create:
	touch ${ARTICLE}/${name}.pas \
	&& code ${ARTICLE}/${name}.pas
