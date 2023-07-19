add_subdirectory(entity)

find_package(SFML 2.5.1 COMPONENTS window system graphics audio network REQUIRED)

add_executable(zombie zombie.cpp)

target_link_libraries(zombie PRIVATE Hud Player)
target_link_libraries(zombie PRIVATE sfml-audio sfml-graphics sfml-network sfml-system)
