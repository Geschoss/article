find_package(Catch2 3 REQUIRED)

add_executable(unit_tests
               calc_test.cpp
               run_test.cpp)
target_link_libraries(unit_tests PRIVATE
                      sut Catch2::Catch2WithMain)

include(Catch)
catch_discover_tests(unit_tests)