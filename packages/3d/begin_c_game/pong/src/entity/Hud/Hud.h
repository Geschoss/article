#pragma once
#include <SFML/Graphics.hpp>

class Hud
{
private:
  sf::Text text_m;

public:
  Hud(sf::Font &font);

  sf::Text get_text();
  // void set_text(int score, int lives);
  void set_text(int score, int lives);
};