program MultAndAdd;
const
  filename = 'numbers.txt';
var
  sum, mul, n: real;
  f: text;
begin
  {$I-}
  assign(f, filename);
  reset(f);
  if IOResult <> 0 then
  begin
    writeln('Error');
    halt(1)
  end;
  sum := 0;
  while not SeekEof(f) do
  begin
    mul := 1;
    while not SeekEoln(f) do
    begin
      read(f, n);
      mul := mul * n;
    end;
    readln(f);
    sum := sum + mul
  end;
  writeln(sum:7:5);
  close(f)
end.