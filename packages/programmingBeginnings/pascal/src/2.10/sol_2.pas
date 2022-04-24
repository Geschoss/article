program SOL2;
type
  ItemPtr = ^Item;
  Item = record
    data: integer;
    next: ItemPtr;
  end;
  Stack = ItemPtr;

procedure SOLInit(var stack: Stack);
begin
  stack := nil;
end;

procedure SOLPush(var stack: Stack; n: integer);
var
  tmp: ItemPtr;
begin
  new(tmp);
  tmp^.data := n;
  tmp^.next := stack;
  stack := tmp
end;

procedure SOLPop(var stack: Stack; var n: integer);
var
  tmp: ItemPtr;
begin
  n := stack^.data;
  tmp := stack;
  stack := tmp^.next;
  dispose(tmp)
end;

function SOLIsEmpty(var stack: Stack): boolean;
begin
  SOLIsEmpty := stack = nil
end;
var
  s: Stack;
  n: integer;
begin
  SOLInit(s);
  while not SeekEof do
  begin
    read(n);
    SOLPush(s, n)
  end;
  writeln('---');
  while not SOLIsEmpty(s) do
  begin
    SOLPop(s, n);
    writeln(n)
  end
end.