cmake_minimum_required(VERSION 3.20.0)
project(Bank CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

add_executable(terminal_app terminal_app.cpp)
add_executable(gui_app gui_app.cpp)

target_link_libraries(terminal_app calculations)
target_link_libraries(gui_app calculations drawing)

add_library(calculations calculations.cpp)
add_library(drawing drawing.cpp)

add_custom_target(checksum ALL
  COMMAND sh -c "cksum terminal_app>termanal.ck"
  COMMAND sh -c "cksum gui_app>gui.ck"
  BYPRODUCTS terminal.ck gui.ck
  COMMENT "Checking the sums..."
)

add_dependencies(checksum terminal_app gui_app)