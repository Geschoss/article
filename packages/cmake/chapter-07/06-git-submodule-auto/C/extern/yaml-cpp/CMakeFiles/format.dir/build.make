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

# Utility rule file for format.

# Include any custom commands dependencies for this target.
include extern/yaml-cpp/CMakeFiles/format.dir/compiler_depend.make

# Include the progress variables for this target.
include extern/yaml-cpp/CMakeFiles/format.dir/progress.make

extern/yaml-cpp/CMakeFiles/format:
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Running clang-format"
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp && clang-format --style=file -i /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/contrib/graphbuilder.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/contrib/graphbuilderadapter.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/binary.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/convert.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/depthguard.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/directives.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/emit.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/emitfromevents.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/emitter.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/emitterstate.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/emitterutils.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/exceptions.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/exp.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/memory.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/node.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/node_data.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/nodebuilder.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/nodeevents.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/null.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/ostream_wrapper.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/parse.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/parser.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/regex_yaml.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/scanner.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/scanscalar.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/scantag.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/scantoken.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/simplekey.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/singledocparser.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/stream.cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp/src/tag.cpp

format: extern/yaml-cpp/CMakeFiles/format
format: extern/yaml-cpp/CMakeFiles/format.dir/build.make
.PHONY : format

# Rule to build all files generated by this target.
extern/yaml-cpp/CMakeFiles/format.dir/build: format
.PHONY : extern/yaml-cpp/CMakeFiles/format.dir/build

extern/yaml-cpp/CMakeFiles/format.dir/clean:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp && $(CMAKE_COMMAND) -P CMakeFiles/format.dir/cmake_clean.cmake
.PHONY : extern/yaml-cpp/CMakeFiles/format.dir/clean

extern/yaml-cpp/CMakeFiles/format.dir/depend:
	cd /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/extern/yaml-cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp /Users/pako/Projects/home/article/packages/cmake/chapter-07/06-git-submodule-auto/C/extern/yaml-cpp/CMakeFiles/format.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : extern/yaml-cpp/CMakeFiles/format.dir/depend

