program ex_pointer_2_38;
type
  iptr3 = array [1..3] of ^integer;
var
  a: iptr3;
  p: ^iptr3;
  x: integer;
  y: integer;
  z: integer;
begin
  x := 1;
  y := 2;
  z := 3;

  a[1] := @x;
  a[2] := @y;
  a[3] := @z;
  p := @a;

  writeln(p^[2]^)
end.