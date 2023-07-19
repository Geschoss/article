#include <SFML/Graphics.hpp>
#include <SFML/Audio.hpp>
#include <string>
#include <sstream>
#include "bee.cpp"
#include "npc.cpp"

int coin(int x, int y);
float rand_v(int max, int min);
void updateBranches(int seed);

const int NUM_BRANCHES = 6;
sf::Sprite branches[NUM_BRANCHES];
enum class Side
{
	LEFT,
	RIGHT,
	NONE
};
Side branch_position[NUM_BRANCHES];

int main()
{
	sf::RenderWindow window(
			sf::VideoMode(1920, 1080),
			"Timber!!!");

	sf::Texture bg_texture;
	bg_texture.loadFromFile("assets/img/background.png");
	sf::Texture rip_texture;
	rip_texture.loadFromFile("assets/img/rip.png");
	sf::Texture axe_texure;
	axe_texure.loadFromFile("assets/img/axe.png");
	sf::Texture player_texture;
	player_texture.loadFromFile("assets/img/player.png");
	sf::Texture tree_texture;
	tree_texture.loadFromFile("assets/img/tree.png");
	sf::Texture bee_texture;
	bee_texture.loadFromFile("assets/img/bee.png");
	sf::Texture cloud_texture;
	cloud_texture.loadFromFile("assets/img/cloud.png");
	sf::Texture branch_texture;
	branch_texture.loadFromFile("assets/img/branch.png");
	sf::Texture log_texture;
	log_texture.loadFromFile("assets/img/log.png");

	for (int i = 0; i < NUM_BRANCHES; i++)
	{
		branches[i].setTexture(branch_texture);
		branches[i].setPosition(-2000, -2000);
		branches[i].setOrigin(220, 20);
	}
	Movable bee(bee_texture, -201, 0);
	Movable clouds[3]{
			Movable{cloud_texture, -300, 0},
			Movable{cloud_texture, -300, 250},
			Movable{cloud_texture, -300, 500},
	};

	NPC bg(bg_texture, 0, 0);
	NPC tree(tree_texture, 810, 0);

	sf::Clock clock;
	bool paused = true;
	int score = 0;
	sf::Text message_text;
	sf::Text scoreText;

	sf::Font font;
	font.loadFromFile("assets/fonts/KOMIKAP_.ttf");

	message_text.setFont(font);
	scoreText.setFont(font);

	message_text.setString("Press Enter to start!");
	scoreText.setString("Score = 0");

	message_text.setCharacterSize(75);
	scoreText.setCharacterSize(100);

	message_text.setFillColor(sf::Color::White);
	scoreText.setFillColor(sf::Color::White);

	sf::FloatRect textRect = message_text.getLocalBounds();
	message_text.setOrigin(
			textRect.left + textRect.width / 2.0f,
			textRect.top + textRect.height / 2.0f);

	message_text.setPosition(1920 / 2.0f, 1080 / 2.0f);
	scoreText.setPosition(20, 20);

	sf::RectangleShape timeBar;
	float timeBarStartWidth = 400;
	float timeBarHeight = 80;
	timeBar.setSize(sf::Vector2f(timeBarStartWidth, timeBarHeight));
	timeBar.setFillColor(sf::Color::Red);
	timeBar.setPosition((1920 / 2) - timeBarStartWidth / 2, 980);

	sf::Time gameTimeTotal;
	float time_remaining = 6.0f;
	float timeBarWidthPerSecond = timeBarStartWidth / time_remaining;

	srand(time(0));
	updateBranches(1);
	updateBranches(2);
	updateBranches(3);
	updateBranches(4);
	updateBranches(5);

	sf::Sprite player_sprite;
	player_sprite.setTexture(player_texture);
	player_sprite.setPosition(580, 720);
	Side player_side = Side::RIGHT;
	sf::Sprite rip_sprite;
	rip_sprite.setTexture(rip_texture);
	rip_sprite.setPosition(675, 2000);
	sf::Sprite axe_sprite;
	axe_sprite.setTexture(axe_texure);
	axe_sprite.setPosition(700, 830);
	const float AXE_POSITION_LEFT = 700;
	const float AXE_POSITION_RIGHT = 1075;
	sf::Sprite log_sprite;
	log_sprite.setTexture(log_texture);
	log_sprite.setPosition(810, 720);

	bool log_active = false;
	float log_speed_x = 1000;
	float log_speed_y = -1500;
	bool accept_input = false;

	// Audio
	sf::SoundBuffer chop_buffer;
	chop_buffer.loadFromFile("assets/sound/chop.wav");
	sf::Sound chop_sound;
	chop_sound.setBuffer(chop_buffer);

	sf::SoundBuffer death_buffer;
	death_buffer.loadFromFile("assets/sound/death.wav");
	sf::Sound death_sound;
	death_sound.setBuffer(death_buffer);

	sf::SoundBuffer oot_buffer;
	oot_buffer.loadFromFile("assets/sound/out_of_time.wav");
	sf::Sound oot_sound;
	oot_sound.setBuffer(oot_buffer);

	while (window.isOpen())
	{
		sf::Event event;

		while (window.pollEvent(event))
		{
			if (event.type == sf::Event::KeyReleased && !paused)
			{
				accept_input = true;
				axe_sprite.setPosition(2000,
															 axe_sprite.getPosition().y);
			}
			if (event.type == sf::Event::Closed)
			{
				window.close();
			}
		}

		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Escape))
		{
			window.close();
		}
		if (sf::Keyboard::isKeyPressed(sf::Keyboard::Return))
		{
			paused = false;
			score = 0;
			time_remaining = 6;

			for (int i = 1; i < NUM_BRANCHES; i++)
			{
				branch_position[i] = Side::NONE;
			}
			rip_sprite.setPosition(675, 2000);
			player_sprite.setPosition(580, 720);
			accept_input = true;
		}

		if (accept_input)
		{
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Right))
			{
				player_side = Side::RIGHT;
				score++;
				time_remaining += (2 / score) + .15;
				axe_sprite.setPosition(AXE_POSITION_RIGHT,
															 axe_sprite.getPosition().y);
				player_sprite.setPosition(1200, 720);

				updateBranches(score);
				log_sprite.setPosition(810, 720);
				log_speed_x = -5000;
				log_active = true;

				accept_input = false;
				chop_sound.play();
			}
			if (sf::Keyboard::isKeyPressed(sf::Keyboard::Left))
			{
				player_side = Side::LEFT;
				score++;
				time_remaining += (2 / score) + .15;
				axe_sprite.setPosition(AXE_POSITION_LEFT,
															 axe_sprite.getPosition().y);
				player_sprite.setPosition(580, 720);

				updateBranches(score);
				log_sprite.setPosition(810, 720);
				log_speed_x = 5000;
				log_active = true;

				accept_input = false;
				chop_sound.play();
			}
		}
		sf::Time dt = clock.restart();
		if (!paused)
		{
			time_remaining -= dt.asSeconds();
			timeBar.setSize(
					sf::Vector2f(
							timeBarWidthPerSecond * time_remaining, timeBarHeight));

			if (time_remaining <= 0.0f)
			{
				paused = true;
				message_text.setString("Out of time!!");

				sf::FloatRect textRect = message_text.getLocalBounds();
				message_text.setOrigin(
						textRect.left + textRect.width / 2.0f,
						textRect.top + textRect.height / 2.0f);
				message_text.setPosition(1920 / 2.0f, 1080 / 2.0f);
				oot_sound.play();
			}

			float dt_sec = dt.asSeconds();
			bee.move(dt_sec);
			if (bee.is_outside())
			{
				float y = rand_v(800, 400);
				float sp = rand_v(400, 200);
				bee.activate(-1.0f, y, sp);
			}

			for (auto &&cloud : clouds)
			{
				cloud.move(dt_sec);
				if (cloud.is_outside())
				{
					float d = coin(-1, 1);
					float y = rand_v(450, -150);
					float sp = rand_v(300, 100);
					cloud.activate(d, y, sp);
				}
			}

			std::stringstream ss;
			ss << "Score = " << score;
			scoreText.setString(ss.str());

			for (int i = 0; i < NUM_BRANCHES; i++)
			{
				float height = i * 150;
				if (branch_position[i] == Side::LEFT)
				{
					branches[i].setPosition(610, height);
					branches[i].setRotation(180);
				}
				else if (branch_position[i] == Side::RIGHT)
				{
					branches[i].setPosition(1330, height);
					branches[i].setRotation(0);
				}
				else
				{
					branches[i].setPosition(3000, height);
				}
			}
		}

		if (log_active)
		{
			log_sprite.setPosition(
					log_sprite.getPosition().x + (log_speed_x * dt.asSeconds()),
					log_sprite.getPosition().y + (log_speed_y * dt.asSeconds()));

			if (log_sprite.getPosition().x < -100 ||
					log_sprite.getPosition().x > 2000)
			{
				log_active = false;
				log_sprite.setPosition(810, 720);
			}
		}

		if (branch_position[5] == player_side)
		{
			paused = true;
			accept_input = false;
			if (player_side == Side::RIGHT)
			{
				rip_sprite.setPosition(1200, 760);
			}
			else
			{
				rip_sprite.setPosition(525, 760);
			}
			player_sprite.setPosition(2000, 660);

			message_text.setString("SQUISHED!!");
			sf::FloatRect text_rect = message_text.getLocalBounds();
			message_text.setOrigin(text_rect.left + text_rect.width / 2.0f,
														 text_rect.top + text_rect.height / 2.0f);
			message_text.setPosition(1920 / 2.0f, 1080 / 2.0f);

			death_sound.play();
		}
		window.clear();
		window.draw(bg.sprite);

		for (auto &&cloud : clouds)
		{
			window.draw(cloud.sprite);
		}

		for (int i = 0; i < NUM_BRANCHES; i++)
		{
			window.draw(branches[i]);
		}
		window.draw(tree.sprite);
		if (!paused)
		{
			window.draw(player_sprite);
			window.draw(axe_sprite);
		}
		window.draw(log_sprite);
		window.draw(rip_sprite);

		window.draw(bee.sprite);

		window.draw(scoreText);

		window.draw(timeBar);

		if (paused)
		{
			window.draw(message_text);
		}

		window.display();
	}
}

int coin(int x, int y)
{
	if (rand() % 2 == 0)
	{
		return x;
	}
	return y;
}
float rand_v(int max, int min)
{
	return (rand() % max) + min;
}

void updateBranches(int seed)
{
	for (int j = NUM_BRANCHES - 1; j > 0; j--)
	{
		branch_position[j] = branch_position[j - 1];
	}
	srand((int)time(0) + seed);
	int r = (rand() % 5);
	switch (r)
	{
	case 0:
		branch_position[0] = Side::LEFT;
		break;
	case 1:
		branch_position[0] = Side::RIGHT;
		break;
	default:
		branch_position[0] = Side::NONE;
		break;
	}
}