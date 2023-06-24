cmake_minimum_required(VERSION 3.20.0)
project(ExternalProjectGit CXX)

set(CMAKE_CXX_STANDARD 17)

add_executable(welcome main.cpp)
configure_file(config.yaml config.yaml COPYONLY)

include(ExternalProject)
ExternalProject_Add(external-yaml-cpp
  GIT_REPOSITORY    https://github.com/jbeder/yaml-cpp.git
  GIT_TAG           yaml-cpp-0.7.0
)
target_link_libraries(welcome PRIVATE external-yaml-cpp)

# include(CMakePrintHelpers)
# cmake_print_properties(TARGETS yaml-cpp
#                        PROPERTIES TYPE SOURCE_DIR)