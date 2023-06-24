#include <iostream>
#include "calc.h"

using namespace std;

int run()
{
    Calc c;
    cout << "2 + 2 = " << c.sum(2, 2) << endl;
    cout << "3 * 3 = " << c.mult(3, 3) << endl;
    return 0;
}