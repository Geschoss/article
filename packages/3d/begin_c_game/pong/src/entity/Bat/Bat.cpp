#include "Bat.h"

Bat::Bat(float x, float y)
{
  speed_m = 1000.0f;
  position_m.x = x;
  position_m.y = y;

  shape_m.setSize(sf::Vector2f(100, 10));
  shape_m.setPosition(position_m);
}

sf::FloatRect Bat::get_postion()
{
  return shape_m.getGlobalBounds();
}

sf::RectangleShape Bat::get_shape()
{
  return shape_m;
}

void Bat::move_left()
{
  moving_left_m = true;
}

void Bat::move_right()
{
  moving_right_m = true;
}

void Bat::stop_left()
{
  moving_left_m = false;
}

void Bat::stop_right()
{
  moving_right_m = false;
}

void Bat::update(sf::Time dt)
{
  if (moving_left_m)
  {
    position_m.x -= speed_m * dt.asSeconds();
  }
  if (moving_right_m)
  {
    position_m.x += speed_m * dt.asSeconds();
  }
  shape_m.setPosition(position_m);
}

bool Bat::is_hit(Ball &ball)
{
  return ball.get_postion().intersects(get_postion());
}