#include <OpenGL/gl.h>
#include <GLUT/glut.h>
#include <math.h>
#include "map.cpp"

#define PI 3.14159265
#define PI2 PI / 2
#define PI3 3 * PI / 2
#define DR 0.0174533 // one degree in radians

class Player
{
	float x;
	float y;
	float dx;
	float dy;
	float a;

public:
	Player(float x, float y) : x(x), y(y)
	{
		a = 0.1;
		dx = cos(a) * 5;
		dy = sin(a) * 5;
	}

	void render()
	{
		glColor3f(1, 1, 0);
		glPointSize(8);
		glBegin(GL_POINTS);
		glVertex2i(x, y);
		glEnd();

		glLineWidth(3);
		glBegin(GL_LINES);
		glVertex2i(x, y);
		glVertex2i(x + dx * 5, y + dy * 5);
		glEnd();
	}

	float dist(float ax, float ay, float bx, float by, float ang)
	{
		return sqrt((bx - ax) * (bx - ax) + (by - ay) * (by - ay));
	}

	void draw_rays_2d(Map *map)
	{
		int r, mx, my, mp, dof;
		float rx, ry, ra, xo, yo, distT;
		ra = a - DR * 30;
		if (ra < 0)
		{
			ra += 2 * PI;
		}
		if (ra > 2 * PI)
		{
			ra -= 2 * PI;
		}

		for (r = 0; r < 60; r++)
		{
			// check horizontal lines---
			dof = 0;
			float distH = 1000000;
			float hx = x;
			float hy = y;
			float aTan = -1 / tan(ra);

			if (ra > PI) // looking down
			{
				ry = (((int)y >> 6) << 6) - 0.0001;
				rx = (y - ry) * aTan + x;
				yo = -64;
				xo = -yo * aTan;
			}
			if (ra < PI) // looking up
			{
				ry = (((int)y >> 6) << 6) + 64;
				rx = (y - ry) * aTan + x;
				yo = 64;
				xo = -yo * aTan;
			}
			if (ra == 0 || ra == PI)
			{
				rx = x;
				ry = y;
				dof = 8;
			}
			while (dof < 8)
			{
				mx = (int)(rx) >> 6;
				my = (int)(ry) >> 6;
				mp = my * map->x + mx;
				if (mp > 0 && mp < map->x * map->y && map->map[mp] == 1) // hit wall
				{
					hx = rx;
					hy = ry;
					distH = dist(x, y, hx, hy, ra);
					dof = 8;
				}
				else // next line
				{
					rx += xo;
					ry += yo;
					dof += 1;
				}
			}

			// check horizontal lines---
			dof = 0;
			float distV = 1000000;
			float vx = x;
			float vy = y;
			float nTan = -tan(ra);

			if (ra > PI2 && ra < PI3) // looking left
			{
				rx = (((int)x >> 6) << 6) - 0.0001;
				ry = (x - rx) * nTan + y;
				xo = -64;
				yo = -xo * nTan;
			}
			if (ra < PI2 || ra > PI3) // looking right
			{
				rx = (((int)x >> 6) << 6) + 64;
				ry = (x - rx) * nTan + y;
				xo = 64;
				yo = -xo * nTan;
			}
			if (ra == 0 || ra == PI)
			{
				rx = x;
				ry = y;
				dof = 8;
			}
			while (dof < 8)
			{
				mx = (int)(rx) >> 6;
				my = (int)(ry) >> 6;
				mp = my * map->x + mx;
				if (mp > 0 && mp < map->x * map->y && map->map[mp] == 1) // hit wall
				{
					vx = rx;
					vy = ry;
					distV = dist(x, y, vx, vy, ra);
					dof = 8;
				}
				else // next line
				{
					rx += xo;
					ry += yo;
					dof += 1;
				}
			}

			if (distV < distH)
			{
				rx = vx;
				ry = vy;
				distT = distV;
				glColor3f(0.9, 0, 0);
			}
			else
			{
				rx = hx;
				ry = hy;
				distT = distH;
				glColor3f(0.6, 0, 0);
			}

			glLineWidth(1);
			glBegin(GL_LINES);
			glVertex2i(x, y);
			glVertex2i(rx, ry);
			glEnd();
			//---Draw 3D Walls---
			float ca = a - ra;
			if (ca < 0)
			{
				ca += 2 * PI;
			}
			if (ca > 2 * PI)
			{
				ca -= 2 * PI;
			}
			distT = distT * cos(ca);
			float lineH = (map->s * 320) / distT;
			float lineO = 160 - lineH / 2;
			if (lineH > 320)
			{
				lineH = 320;
			}
			glLineWidth(8);
			glBegin(GL_LINES);
			glVertex2i(r * 8 + 530, lineO);
			glVertex2i(r * 8 + 530, lineH + lineO);
			glEnd();

			ra += DR;
			if (ra < 0)
			{
				ra += 2 * PI;
			}
			if (ra > 2 * PI)
			{
				ra -= 2 * PI;
			}
		}
	};

	void left()
	{
		x -= cos(a + (PI / 2)) * 5;
		y -= sin(a + (PI / 2)) * 5;
	}

	void right()
	{
		x += cos(a + (PI / 2)) * 5;
		y += sin(a + (PI / 2)) * 5;
	}

	void turn_left()
	{
		a -= 0.1;
		if (a < 0)
		{
			a += 2 * PI;
		}

		dx = cos(a) * 5;
		dy = sin(a) * 5;
	}
	void turn_right()
	{
		a += 0.1;
		if (a > 2 * PI)
		{
			a -= 2 * PI;
		}

		dx = cos(a) * 5;
		dy = sin(a) * 5;
	}
	void down()
	{
		x -= dx;
		y -= dy;
	}

	void up()
	{
		x += dx;
		y += dy;
	}
};