#pragma once
#include <SFML/Graphics.hpp>

class Player
{
private:
    const float START_SPEED;
    const float START_HEALTH;

    sf::Time last_hit_m;
    sf::Sprite sprite_m;
    sf::IntRect arena_m;
    sf::Texture texture_m;
    sf::Vector2f position_m;
    sf::Vector2f resolution_m;

    int tile_size_m;
    int max_health_m;
    float speed_m;

    bool up_pressed_m;
    bool down_pressed_m;
    bool left_pressed_m;
    bool right_pressed_m;

    Player();
};