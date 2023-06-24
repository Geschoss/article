#include <string>
#include <iostream>
#include <sstream>

using namespace std;

int run();

void RunOutputsCorrectEquations()
{
    string expected{"2 + 2 = 4\n3 * 3 = 9\n"};
    stringstream buffer;

    auto prevcoutbuf = cout.rdbuf(buffer.rdbuf());
    run();
    auto output = buffer.str();
    cout.rdbuf(prevcoutbuf);
    if (expected != output)
    {
        exit(1);
    }
}