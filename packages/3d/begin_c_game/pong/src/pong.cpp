#include <SFML/Graphics.hpp>
#include <iostream>
#include <cstdlib>
#include <sstream>
#include <string>
#include "Bat.h"
#include "Hud.h"
#include "Ball.h"

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
  int score = 0;
  int lives = 3;

  Bat bat(WINDOW_WIDTH / 2, WINDOW_HEIGHT - 20);
  Ball ball(WINDOW_WIDTH / 2, 100);

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
      bat.move_left();
    }
    else
    {
      bat.stop_left();
    }
    if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
    {
      bat.move_right();
    }
    else
    {
      bat.stop_right();
    }
    sf::Time dt = clock.restart();

    bat.update(dt);
    ball.update(dt);
    hud.set_text(score, lives);

    if (ball.is_fall_down(window))
    {
      ball.rebound_bottom();
      lives--;
      if (lives < 1)
      {
        score = 0;
        lives = 3;
      }
    }
    if (ball.is_hit_roof(window))
    {
      ball.rebound();
      score++;
    }
    if (ball.is_hit_side(window))
    {
      ball.rebound_sides();
    }

    if (bat.is_hit(ball))
    {
      ball.rebound();
    }

    window.clear();
    window.draw(hud.get_text());
    window.draw(bat.get_shape());
    window.draw(ball.get_shape());
    window.display();
  }
  return 0;
}