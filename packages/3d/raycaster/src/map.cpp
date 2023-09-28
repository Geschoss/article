#include <OpenGL/gl.h>
#include <GLUT/glut.h>

class Map
{
public:
	int x;
	int y;
	int s;
	int *map;

	Map()
	{
		x = 8;
		y = 8;
		s = 64;
		map = new int[64] {
			1, 1, 1, 1, 1, 1, 1, 1,
			1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 1, 0, 0, 0, 0, 1,
			1, 1, 1, 0, 0, 0, 0, 1,
			1, 0, 0, 0, 0, 0, 0, 1,
			1, 0, 1, 1, 0, 0, 0, 1,
			1, 0, 0, 1, 0, 0, 0, 1,
			1, 1, 1, 1, 1, 1, 1, 1,
		};
	}

	void render() {
		int i, j, xo, yo;
		for (i = 0; i < y; i++) {
			for (j = 0; j < x; j++) {
				if (map[i*x + j]==1) {
					glColor3f(1, 1, 1);
				} else {
					glColor3f(0, 0, 0);
				}
				yo = i*s;
				xo = j*s;

				glBegin(GL_QUADS);
				glVertex2i(xo + 1, yo + 1);
				glVertex2i(xo + 1, yo + s - 1);
				glVertex2i(xo + s - 1, yo + s - 1);
				glVertex2i(xo + s - 1, yo + 1);
				glEnd();
			}
		}
	}
};