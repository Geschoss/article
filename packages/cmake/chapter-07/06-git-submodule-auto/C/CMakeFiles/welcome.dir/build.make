# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.25

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:

#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:

# Disable VCS-based implicit rules.
% : %,v

# Disable VCS-based implicit rules.
% : RCS/%

# Disable VCS-based implicit rules.
% : RCS/%,v

# Disable VCS-based implicit rules.
% : SCCS/s.%

# Disable VCS-based implicit rules.
% : s.%

.SUFFIXES: .hpux_make_needs_suffix_list

# Command-line flag to silence nested $(MAKE).
$(VERBOSE)MAKESILENT = -s

#Suppress display of executed commands.
$(VERBOSE).SILENT:

# A target that is always out of date.
cmake_force:
.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /opt/homebrew/Cellar/cmake/3.25.2/bin/cmake

# The command to remove a file.
RM = /opt/homebrew/Cellar/cmake/3.25.2/bin/cmake -E rm -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C

# Include any dependencies generated for this target.
include CMakeFiles/welcome.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/welcome.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/welcome.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/welcome.dir/flags.make

CMakeFiles/welcome.dir/main.cpp.o: CMakeFiles/welcome.dir/flags.make
CMakeFiles/welcome.dir/main.cpp.o: /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/main.cpp
CMakeFiles/welcome.dir/main.cpp.o: CMakeFiles/welcome.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/welcome.dir/main.cpp.o"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/welcome.dir/main.cpp.o -MF CMakeFiles/welcome.dir/main.cpp.o.d -o CMakeFiles/welcome.dir/main.cpp.o -c /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/main.cpp

CMakeFiles/welcome.dir/main.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/welcome.dir/main.cpp.i"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/main.cpp > CMakeFiles/welcome.dir/main.cpp.i

CMakeFiles/welcome.dir/main.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/welcome.dir/main.cpp.s"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/main.cpp -o CMakeFiles/welcome.dir/main.cpp.s

# Object files for target welcome
welcome_OBJECTS = \
"CMakeFiles/welcome.dir/main.cpp.o"

# External object files for target welcome
welcome_EXTERNAL_OBJECTS =

welcome: CMakeFiles/welcome.dir/main.cpp.o
welcome: CMakeFiles/welcome.dir/build.make
welcome: extern/yaml-cpp/libyaml-cpp.a
welcome: CMakeFiles/welcome.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX executable welcome"
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/welcome.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/welcome.dir/build: welcome
.PHONY : CMakeFiles/welcome.dir/build

CMakeFiles/welcome.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/welcome.dir/cmake_clean.cmake
.PHONY : CMakeFiles/welcome.dir/clean

CMakeFiles/welcome.dir/depend:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/CMakeFiles/welcome.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/welcome.dir/depend

