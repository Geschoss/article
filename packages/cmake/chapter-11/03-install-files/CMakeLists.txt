cmake_minimum_required(VERSION 3.20.0)
project(InstallFiles CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(GNUInstallDirs)
install(FILES
		src/include/calc/calc.h
		src/include/calc/nested/calc_extended.h
		DESTINATION ${CMAKE_INSTALL_INCLUDEDIR}/calc
)
