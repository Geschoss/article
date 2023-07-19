#pragma once
#include <SFML/Graphics.hpp>

class Ball
{
private:
  float speed_m;
  float direction_x;
  float direction_y;
  sf::Vector2f position_m;
  sf::RectangleShape shape_m;

public:
  Ball(float x, float y);

  sf::FloatRect get_postion();
  sf::RectangleShape get_shape();
  float get_x_velocity();
  
  void rebound();
  void rebound_sides();

  bool is_fall_down(sf::RenderWindow &w);
  bool is_hit_roof(sf::RenderWindow &w);
  bool is_hit_side(sf::RenderWindow &w);

  void rebound_bottom();

  void update(sf::Time dt);
};