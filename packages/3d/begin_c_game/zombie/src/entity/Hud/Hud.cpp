#include <iostream>
#include <cstdlib>
#include <sstream>
#include <string>
#include "Hud.h"

Hud::Hud(sf::Font &font)
{
  text_m.setFont(font);
  text_m.setCharacterSize(75);
  text_m.setFillColor(sf::Color::White);
  text_m.setPosition(20.0f, 20.0f);
}

void Hud::set_text(int score, int lives)
{
  std::stringstream ss;
  ss << "Score: " << score << " Lives: " << lives;
  text_m.setString(ss.str());
}

sf::Text Hud::get_text()
{
  return text_m;
}
