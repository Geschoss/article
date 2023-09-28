#include <OpenGL/gl.h>
#include <GLUT/glut.h>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "player.cpp"

#define PI 3.14159265
#define PI2 PI / 2
#define PI3 3 * PI / 2

Player *player;
Map *map;

void buttons(unsigned char key, int x, int y)
{
	if (key == 'a')
	{
		player->left();
	}
	if (key == 'd')
	{
		player->right();
	}
	if (key == 'w')
	{
		player->up();
	}
	if (key == 's')
	{
		player->down();
	}
	if (key == 'k')
	{
		player->turn_left();
	}
	if (key == 'l')
	{
		player->turn_right();
	}
	glutPostRedisplay();
}

int main(int argc, char *argv[])
{
	glutInit(&argc, argv);
	glutInitDisplayMode(GLUT_DOUBLE | GLUT_RGBA);
	glutInitWindowSize(1024, 512);
	glutCreateWindow("");

	glClearColor(0.3, 0.3, 0.3, 0);
	gluOrtho2D(0, 1024, 512, 0);
	map = new Map();
	player = new Player(300, 300);

	auto display = []()
	{
		glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
		map->render();
		player->draw_rays_2d(map);
		player->render();
		glutSwapBuffers();
	};

	glutDisplayFunc(display);
	glutKeyboardFunc(buttons);
	glutMainLoop();
}