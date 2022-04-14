program mul;
var
  x, y: longint;
begin
  {$I-}
  read(x, y);
  if IOResult = 0 then
    writeln(x * y)
  else
    writeln('I coulnd''t parse your input')
end.