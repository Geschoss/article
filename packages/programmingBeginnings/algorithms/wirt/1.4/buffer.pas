unit Buffer;
uses Processes;
interface
const
  BUFFER_SIZE = 1024;

procedure deposite(x: word);
procedure fetch(var x: word);

implementation
var
  n, i, out: Cardinal;
  buf: array[0..BUFFER_SIZE-1] of word;
  nonfull: Signal;
  nonempty: Signal;

procedure deposite(x: word);
begin
  if n = BUFFER_SIZE then
    wait(nonfull)
  else
  begin
    n := n + 1;
    buf[i] := x;
    i := (i + 1) mod n
    if n = 1 then
      send(nonempty)
  end;
end;

procedure fetch(var x: word);
begin
  if n = 0 then
    wait(nonfull)
  else
  begin
    x := buf[out];
    n := n - 1;
    if n = 0 then
      out := 0
    else
      out := (out + 1) mod n
      if n = BUFFER_SIZE - 1 then
        send(nonempty)
  end;
end;
begin
  n = 0;
  i = 0;
  out = 0;
  Init(nonfull);
  Init(nonempty)
end.