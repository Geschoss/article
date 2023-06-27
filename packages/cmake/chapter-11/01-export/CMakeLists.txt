cmake_minimum_required(VERSION 3.20.0)
project(ExportCalc CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_subdirectory(src bin)

set(EXPORT_DIR "${CMAKE_CURRENT_BINARY_DIR}/cmake")

install(TARGETS calc EXPORT CalcTargets)
export(EXPORT CalcTargets
	  FILE "${EXPORT_DIR}/CalcTargets2.cmake"
	  NAMESPACE Calc::
)
