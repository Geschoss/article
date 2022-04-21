program SimpleList;
type
  itemptr = ^item;
  item = record
    data: integer;
    next: itemptr;
  end;
function FindLast(i: itemptr): itemptr;
begin
  if i = nil then
    FindLast := i
  else
    FindLast := FindLast(i^.next)
end;
var
  first: itemptr;
  last: itemptr;
  n: integer;
begin
  first := nil;
  last := nil;

  while not SeekEof do
  begin
    read(n);
    if first = nil then
    begin
      new(first);
      last := first
    end
    else
    begin
      new(last^.next);
      last := last^.next;
    end;
    last^.data := n;
    last^.next := nil;
  end;

  writeln('-');
  while first <> nil do
  begin
    writeln(first^.data);
    first := first^.next
  end;
  while first <> nil do
  begin
    last := first^.next;
    dispose(first);
    first := last
  end
end.
