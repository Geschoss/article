cmake_minimum_required(VERSION 3.20.0)
project(NoFrameworkTestsStructured CXX)

set(CMAKE_CXX_STANDARD 17)

enable_testing()

add_subdirectory(src bin)
add_subdirectory(test)