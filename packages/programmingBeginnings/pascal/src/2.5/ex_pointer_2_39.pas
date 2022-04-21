program ex_pointer_2_38;
type
  pair = record
    a: integer;
    b: real;
  end;
  twoptrs = record
    g, h: ^pair;
    t: ^integer;
  end;
var
  tp2: twoptrs;
  m, n: pair;
  x: integer;
begin
  x := 200;
  m.a := 1;
  m.b := 1.3;

  n.a := 2;
  n.b := 2.3;

  tp2.g := @m;
  tp2.h := @n;
  tp2.t := @x;

  writeln(tp2.g^.b)
end.