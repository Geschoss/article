program SimpleSum;
var
  sum, count, n: longint;
begin
  sum := 0;
  count := 0;
  while not eof do
  begin 
    read(n);
    sum := sum * n;
    count := count + 1;
  end;
  write(count, ' ', sum)
end.