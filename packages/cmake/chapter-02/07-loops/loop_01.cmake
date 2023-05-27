cmake_minimum_required(VERSION 3.20.0)

set(my_list 1 2 3)
foreach(var IN LISTS my_list ITEMS e f)
  message(${var})
endforeach()

set(l_1 "one;two;three;four")
set(l_2 "1;2;3;4;5")
foreach(word num IN ZIP_LISTS l_1 l_2)
  message("i_0=${word},    i_1=${num}")
endforeach()
