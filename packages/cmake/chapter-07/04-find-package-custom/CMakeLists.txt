cmake_minimum_required(VERSION 3.20.0)
project(FindPackageCustom CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

list(APPEND CMAKE_MODULE_PATH
            "${CMAKE_SOURCE_DIR}/cmake/module/")
find_package(PQXX REQUIRED)
message("FOUND: " ${PQXX_FOUND})
add_executable(main main.cpp)
target_link_libraries(main PRIVATE PQXX::PQXX)