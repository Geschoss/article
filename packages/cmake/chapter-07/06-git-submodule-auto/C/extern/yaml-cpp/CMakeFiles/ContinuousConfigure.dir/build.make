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

# Utility rule file for ContinuousConfigure.

# Include any custom commands dependencies for this target.
include extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/compiler_depend.make

# Include the progress variables for this target.
include extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/progress.make

extern/yaml-cpp/CMakeFiles/ContinuousConfigure:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp && /opt/homebrew/Cellar/cmake/3.25.2/bin/ctest -D ContinuousConfigure

ContinuousConfigure: extern/yaml-cpp/CMakeFiles/ContinuousConfigure
ContinuousConfigure: extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/build.make
.PHONY : ContinuousConfigure

# Rule to build all files generated by this target.
extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/build: ContinuousConfigure
.PHONY : extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/build

extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/clean:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp && $(CMAKE_COMMAND) -P CMakeFiles/ContinuousConfigure.dir/cmake_clean.cmake
.PHONY : extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/clean

extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/depend:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : extern/yaml-cpp/CMakeFiles/ContinuousConfigure.dir/depend

