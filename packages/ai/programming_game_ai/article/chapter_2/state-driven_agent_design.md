## State-Driven Agent Design
**FSM**
Very popular, this why:
- **they are quick and simple to code**
- **they are easy to debug**
- **they have little computational overhead**
- **they are intuitive**
- **they are flexible**

### What exactly is a Finite State Machine?
- is a rigidly formalized device used by mathematicians to solve problems.
_A finite state machine is a device, or a model of a device, which has a finite number of states it can be in at any given time and can operate on input to either make transitions from one state to another ot to cause an output or action to take place. A finite state machine can only be in one state at any moment in time._

### Implementing a Finit state Machine
A native approach is to use a series of if-then statements but...
more states - more problem.

**State Transition Tables**
- a table of conditions and the states those conditions lead to.

RunAway -> Safe                             -> Patrol
Attack  -> WeakerThanEnemy                  -> RunAway
Patrol  -> Threatened && StrongerThanenamy  -> Attack
Patrol  -> THreatened && WeakerThatEnemy    -> RunAway

### Embedded Rules
