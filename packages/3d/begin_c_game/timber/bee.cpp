#include <SFML/Graphics.hpp>
#include <iostream>

class Movable
{
private:
  bool active;
  float direction;
  float speed;

public:
  sf::Sprite sprite;
  Movable(const sf::Texture &texture, float x, float y)
      : sprite(),
        active(false),
        speed(0.0f), direction(1.0f)
  {
    sprite.setTexture(texture);
    sprite.setPosition(x, y);
  };

  bool is_active();
  bool is_outside();

  void disabled();
  void activate(float direction, float y, float sp);

  void move(float dt);
};
bool Movable::is_outside()
{
  float x = sprite.getPosition().x;
  return x < -200 || x > 2000;
}
void Movable::move(float s)
{
  sprite.setPosition(
      sprite.getPosition().x + (speed * s * direction),
      sprite.getPosition().y);
}
void Movable::disabled()
{
  active = false;
}
bool Movable::is_active()
{
  return active;
};
void Movable::activate(float d, float y, float sp)
{
  speed = sp;
  active = true;
  direction = d;
  if (direction == -1.0f)
  {
    sprite.setPosition(2000, y);
  }
  else
  {
    sprite.setPosition(-200, y);
  }
}
