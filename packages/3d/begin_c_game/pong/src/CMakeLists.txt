add_subdirectory(entity)

find_package(SFML 2.5.1 COMPONENTS window system graphics audio network REQUIRED)

add_executable(pong pong.cpp)
add_executable(tmp tmp.cpp)

target_link_libraries(pong PRIVATE Bat Ball Hud)
target_link_libraries(pong PRIVATE sfml-audio sfml-graphics sfml-network sfml-system)

# add_custom_target(copy_assets
#     COMMAND ${CMAKE_COMMAND} -E copy_directory ${CMAKE_CURRENT_LIST_DIR}/assets ${CMAKE_CURRENT_BINARY_DIR}/assets
# )
# add_dependencies(pong copy_assets)
