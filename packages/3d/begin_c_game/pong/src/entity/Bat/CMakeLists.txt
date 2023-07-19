add_library(Bat Bat.cpp)
target_link_libraries(Bat PRIVATE Ball)
target_include_directories(Bat PUBLIC .)
