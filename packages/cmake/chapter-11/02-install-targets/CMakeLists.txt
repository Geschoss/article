cmake_minimum_required(VERSION 3.20.0)
project(InstallTarget CXX)
add_subdirectory(src bin)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(GNUInstallDirs)
install(TARGETS calc
  ARCHIVE
  PUBLIC_HEADER
  DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/calc
)
