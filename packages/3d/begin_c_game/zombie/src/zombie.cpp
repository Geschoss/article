#include <SFML/Graphics.hpp>
#include <iostream>
#include <cstdlib>
#include <sstream>
#include <string>
#include "Hud.h"

int WINDOW_WIDTH = 1920.0f;
int WINDOW_HEIGHT = 1080.0f;
int main()
{
  // stuff
  sf::Font font;
  font.loadFromFile("assets/fonts/DS-DIGI.TTF");
  // end_stuff

  sf::RenderWindow window(
      sf::VideoMode(WINDOW_WIDTH, WINDOW_HEIGHT),
      "Pong");

  Hud hud(font);

  sf::Clock clock;
  while (window.isOpen())
  {
    sf::Event event;
    while (window.pollEvent(event))
    {
      if (event.type == sf::Event::Closed)
      {
        window.close();
      }
    }

    // handle key
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Escape))
    {
      window.close();
    }
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
    {
    }
    else
    {
    }
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
    {
    }
    else
    {
    }
    sf::Time dt = clock.restart();

    window.clear();
    window.draw(hud.get_text());
    window.display();
  }
  return 0;
}