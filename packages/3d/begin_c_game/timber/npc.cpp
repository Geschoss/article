#include <SFML/Graphics.hpp>

class NPC
{

public:
  sf::Sprite sprite;

  NPC(const sf::Texture &texture, float x, float y) : sprite()
  {
    sprite.setTexture(texture);
    sprite.setPosition(x, y);
  };
};
