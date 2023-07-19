#include "Ball.h"

Ball::Ball(float x, float y)
{
  speed_m = 1300.0f;
  direction_x = 0.2f;
  direction_y = 0.2f;
  position_m.x = x;
  position_m.y = y;

  shape_m.setSize(sf::Vector2f(10, 10));
  shape_m.setPosition(position_m);
}

sf::FloatRect Ball::get_postion()
{
  return shape_m.getGlobalBounds();
}

sf::RectangleShape Ball::get_shape()
{
  return shape_m;
}

float Ball::get_x_velocity()
{
  return direction_x;
}

void Ball::rebound_sides()
{
  direction_x = -direction_x;
}

void Ball::rebound()
{
  direction_y = -direction_y;
}

void Ball::rebound_bottom()
{
  position_m.y = 0;
  position_m.x = 500;
  direction_y = -direction_y;
}
void Ball::update(sf::Time dt)
{
  position_m.y += direction_y * speed_m * dt.asSeconds();
  position_m.x += direction_x * speed_m * dt.asSeconds();

  shape_m.setPosition(position_m);
}

bool Ball::is_fall_down(sf::RenderWindow &w)
{
  return get_postion().top > w.getSize().y;
}
bool Ball::is_hit_roof(sf::RenderWindow &w)
{
  return get_postion().top < 0;
}
bool Ball::is_hit_side(sf::RenderWindow &w)
{
  sf::FloatRect p = get_postion();
  return p.left < 0 || p.left + p.width > w.getSize().x;
}