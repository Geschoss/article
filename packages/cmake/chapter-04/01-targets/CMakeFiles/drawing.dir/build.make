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
CMAKE_SOURCE_DIR = /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets

# Include any dependencies generated for this target.
include CMakeFiles/drawing.dir/depend.make
# Include any dependencies generated by the compiler for this target.
include CMakeFiles/drawing.dir/compiler_depend.make

# Include the progress variables for this target.
include CMakeFiles/drawing.dir/progress.make

# Include the compile flags for this target's objects.
include CMakeFiles/drawing.dir/flags.make

CMakeFiles/drawing.dir/drawing.cpp.o: CMakeFiles/drawing.dir/flags.make
CMakeFiles/drawing.dir/drawing.cpp.o: drawing.cpp
CMakeFiles/drawing.dir/drawing.cpp.o: CMakeFiles/drawing.dir/compiler_depend.ts
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --progress-dir=/Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Building CXX object CMakeFiles/drawing.dir/drawing.cpp.o"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -MD -MT CMakeFiles/drawing.dir/drawing.cpp.o -MF CMakeFiles/drawing.dir/drawing.cpp.o.d -o CMakeFiles/drawing.dir/drawing.cpp.o -c /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/drawing.cpp

CMakeFiles/drawing.dir/drawing.cpp.i: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Preprocessing CXX source to CMakeFiles/drawing.dir/drawing.cpp.i"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -E /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/drawing.cpp > CMakeFiles/drawing.dir/drawing.cpp.i

CMakeFiles/drawing.dir/drawing.cpp.s: cmake_force
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green "Compiling CXX source to assembly CMakeFiles/drawing.dir/drawing.cpp.s"
	/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin/c++ $(CXX_DEFINES) $(CXX_INCLUDES) $(CXX_FLAGS) -S /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/drawing.cpp -o CMakeFiles/drawing.dir/drawing.cpp.s

# Object files for target drawing
drawing_OBJECTS = \
"CMakeFiles/drawing.dir/drawing.cpp.o"

# External object files for target drawing
drawing_EXTERNAL_OBJECTS =

libdrawing.a: CMakeFiles/drawing.dir/drawing.cpp.o
libdrawing.a: CMakeFiles/drawing.dir/build.make
libdrawing.a: CMakeFiles/drawing.dir/link.txt
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --green --bold --progress-dir=/Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Linking CXX static library libdrawing.a"
	$(CMAKE_COMMAND) -P CMakeFiles/drawing.dir/cmake_clean_target.cmake
	$(CMAKE_COMMAND) -E cmake_link_script CMakeFiles/drawing.dir/link.txt --verbose=$(VERBOSE)

# Rule to build all files generated by this target.
CMakeFiles/drawing.dir/build: libdrawing.a
.PHONY : CMakeFiles/drawing.dir/build

CMakeFiles/drawing.dir/clean:
	$(CMAKE_COMMAND) -P CMakeFiles/drawing.dir/cmake_clean.cmake
.PHONY : CMakeFiles/drawing.dir/clean

CMakeFiles/drawing.dir/depend:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets /Users/pako/Projects/home/article/packages/cmake/chapter-04/01-targets/CMakeFiles/drawing.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : CMakeFiles/drawing.dir/depend
