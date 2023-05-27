cmake_minimum_required(VERSION 3.20.0)

set(my_list a list "of;five;elemtns")

message("the list is: " ${my_list})
list(LENGTH my_list len)
message("len=" ${len})