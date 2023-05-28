cmake_minimum_required(VERSION 3.20.0)
project(Sources CXX)

add_executable(main main.cpp)

if (CMAKE_SYSTEM_NAME STREQUAL "Linux")
    target_sources(main PRIVATE gui_linux.cpp)
elseif(CMAKE_SYSTEM_NAME STREQUAL "Windows")
    target_sources(main PRIVATE gui_windows.cpp)
elseif(CMAKE_SYSTEM_NAME STREQUAL "Darwin")
    target_sources(main PRIVATE gui_mac.cpp)
endif()