cmake_minimum_required(VERSION 3.20.0)

macro(main)
  message("start main")
  setup_first_target()
  setup_second_target()
endmacro()

function(setup_first_target)
  message("setup_first_target")
endfunction()
function(setup_second_target)
  message("setup_second_target")
endfunction()

main()