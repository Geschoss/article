program recursion;
procedure PrintChars(ch: char; count: integer);
begin
  if count > 0 then
  begin
    write(ch);
    PrintChars(ch, count - 1)
  end
end;
procedure PrintDigitsOfNumber(n: integer);
begin
  if n > 0 then
  begin
    PrintDigitsOfNumber(n div 10);
    write(n mod 10, ' ')
  end
end;
function DoReverseNumber(n, m: longint): longint;
begin
  if n = 0 then
    DoReverseNumber := m
  else
    DoReverseNumber :=
        DoReverseNumber(n div 10, m * 10 + n mod 10)
end;
function ReverseNumber(n: longint): longint;
begin
  ReverseNumber := DoReverseNumber(n, 0);
end;
var
    n: integer;
begin
  write(ReverseNumber(752));
  writeln;
  PrintChars('_', 10);
  writeln;
  PrintDigitsOfNumber(7583)
end.
