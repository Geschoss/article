cmake_minimum_required(VERSION 3.20.0)

project(Enviroment)

message("generated with " $ENV{myenv})
add_custom_target(
  EchoEnv ALL COMMAND
  echo "myenv in blind is" $ENV{myenv}
)
