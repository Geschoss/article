cmake_minimum_required(VERSION 3.20.0)
project(FindPackageProtobufVariables CXX)

set(CMAKE_CXX_STANDARD 17)

find_package(Protobuf REQUIRED)
protobuf_generate_cpp(GENERATED_SRC GENERATED_HEADER
                        message.proto)

add_executable(main main.cpp
                ${GENERATED_SRC} ${GENERATED_HEADER})

target_link_libraries(main ${Protobuf_LIBRARIES})
target_include_directories(main PRIVATE
                                ${Protobuf_INCLUDE_DIRS}
                                ${CMAKE_CURRENT_BINARY_DIR})