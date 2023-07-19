#pragma once
#include <SFML/Graphics.hpp>
#include "Ball.h"

class Bat
{
private:
  float speed_m;
  bool moving_left_m;
  bool moving_right_m;
  sf::Vector2f position_m;
  sf::RectangleShape shape_m;

public:
  Bat(float x, float y);

  sf::FloatRect get_postion();
  sf::RectangleShape get_shape();
  void move_left();
  void move_right();
  void stop_left();
  void stop_right();
  void update(sf::Time dt);
  bool is_hit(Ball &ball);
};