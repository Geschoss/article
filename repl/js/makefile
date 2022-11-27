# rust
RUST_BUILD_PATH = build
RUST_COMPILES_FLAGS += --out-dir ${RUST_BUILD_PATH}
FILE_NAME = 05

create_build:
	@if [ ! -d "${RUST_BUILD_PATH}" ]; then \
	 mkdir ${RUST_BUILD_PATH}; \
	fi	

rust_build: create_build
	@rustc ${RUST_COMPILES_FLAGS} ${FILE_NAME}.rs

rust_exec:
	@./${RUST_BUILD_PATH}/${FILE_NAME}

rust_clean:
	@rm -rf ${RUST_BUILD_PATH}/

rust: rust_build rust_exec rust_clean
