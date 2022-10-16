# A Math and Physics Primer
There's no hidding from it - if you want to learn AI, it helps to know some mathematics and physics.

## Mathematics
learn physics without math is like trying to fly without wings.

### Cartesian Coordinates
system to describe the positions of the points, lines, and bitmaps that make up the image.
In two dimensions, the coordinate system is defined by two axes positioned at right angles to each other and marked off in unit leghts.

- hotizontal axis - _x_-axis
- vertical axis - _y_-axis
- from behind your screen to way behind your head - _z_-axis
- the point where the axes cross - _origin_

A point in 2D space is represented by a _coordinate pair_ (x, y).

### Functions and Equations
A _function_ expresses the relationship between two (or more) terms called _variables_, and is typically written in the form of an _equatoin_

#### Exponents and Powers
_f(x)=a^2_ - f(x) equals a to the power x
_a_ - base
_x_ - power

#### Roots of Numbers (Radicals)
The _square root_ of a number is a value that when multiplied by itself result in the original number

## Trigonometry
is based on the study of triangles.

#### Rays and Line Segments
_ray_ is a line with one endpoint. It is of infinite length and is defined by a direction and an origin.
_line segment_ is a _piece_ of a line and is defined by two endpointd.

#### Angles
_angle_ is defined as the measure of divergence of two rays that share the same origin.
_radians_ are a unit of measurement based upon a circle of unit radius.

_perimeter=2Pr_
_P_ - 3.24259
_360 = 2 P_ rads
_1 = 2 P / 360_ rads

#### Triangles
inner angles always add up to _P_ radians (180 degrees)
- An **equilateral** triangle has sides of equal length. Triangles with this property also have angles of equal sizes.
- An **isosceles** triangles has two sides and two angles of equal size.
- A **right-angled** triangle has one angle that is _p_/2 radians (90 degrees) - a _right angle_. The right angle is always represented by a box.
- An **acute** triangle's inner angles are all acute(less than _P_/2 redians)
- An **obtuse** triangle has one angle that is obtuse(greater than _P_/2 radians)

**Pythagorean Theorem**
_The square of the hypotenuse of a right-angled triangle is equal to the sum of the squares of the other two sides_
**h^2 = a^2 + b^2**

**The Mysteries of SohCahToa Unveiled**
_hypotenuse_ - side opposite the right angle
_opposite_ - side opposite the angle
_adjacent_ - side lying between the angle and the right angle

_sin(O)=opposite/hypotenuse_
_cos(O)=adjacent/hypotenuse_
_tan(O)=opposite/adjacent_

#### Vectors
_P=(x,y)_
_v=(x,y)_
- _direction_ - represents the heading
- _magnitude_ - represents the speed

**Adding and Subtractiong Vectors**
(-5, 5) (0, -10) (13, 7) (-4, 3)

_new x_ = (-5) + (0) + 13 + (-4) = 4
_new y_ = (5) + (-10) + (7) + (3) = 5

**Multiplying Vectors**
v(4,5) * 2 = v(8,10)

**Calculating the Magnitude of a Vector**
v(4,5)
_magnitude=sqrt(4^2 + 5^2)_

**Normalizing Vector**
_N=v/|v|_
_new x_ = x / magnitude
_new y_ = y / magnitude

**Resolving Vectors**
it's posible to use trigonometry to resolve a vector into two separate vectors.

_cos(O)=adjacent/hypotenuse = Oa/|v|_
_Oa=|v|*cos(O)= y component_

_sin(O)=opposite/hypotenuse=Ob/|v|_
_Ob=|v|*sin(O)= x component_

**The Dot Product**
gives the angle between two vectors.
_u . v = uxvx + uyvy_
_u . v = |u||v|*cos(O)_
_cos(O) = u . v / |u||v|_ => _cos(O) = u . v / 1*1_ => _cos(O) = u . v_

#### Local space and World Space
_world space_ - representation is normally what you see rendered to your screen. Every object is defined by a position and orientation _relatice to the origin of the world coordinate system_

_local space_ - describes the position and orientation of objects relative to a specific entity's local coordinate system. An entity's local coordinate system can be defined by a facing vector and a side vector(representing the local x- and y-axis, respectivly), with the origin positioned ar the enter of the entity.

#### Physics
_The science of matter and energy and of the interactions between the two._

##### Time
Time is a scalar quantity(completely specified by its megnitude and with no direction) measured in seconds, abbreviated to _s_.
_The suration of 9,192,631, 770 periods of the radiation corresponding to the transirion between the two hyperfine levels of the ground state of the cesium 133 atom_
**virtual seconf** - intyerval between updates

##### Distance
The standard unit of distance - a scalar quantity - is the meter, abbreviated to _m_.

##### Mass
Mass is a scalar quantity measured in kilograms, abbreviated to _kg_. Mass is the measure of an _amount_ of something.
yet mass is not a unit of weight; it is a unit of _matter_

##### Position
_center of mass_

##### Velocity
Velocity is a vector quantity(a quantity that has magnitude and direction) that expresses _the rate of change of distance over time_.
unit: metter per second, _m/s_

_v=dx/dt_

_dx=vdt_

##### Acceleration
is the a vector quantity that expresses _the rate of change of velocity over time_

_a=dv/dt_


##### Force
_An impressed force is an action exerted upon a body in order to change its state, either of rest, or of uniform motion in a right line._
_The force required to make a one-kilogram mass move from rest to a speed of one meter per second in one second._

Type of forces:
- contect
- non-contact

_F=ma_
