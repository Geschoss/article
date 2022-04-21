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
  link: itemptr;
  tmp: itemptr;
  n: integer;
begin
  link := nil;
  while not SeekEof do
  begin
    read(n);
    new(tmp);
    tmp^.data := n;
    tmp^.next := link;
    link := tmp
  end;
  writeln('-');
  tmp := link;
  while tmp <> nil do
  begin
    writeln(tmp^.data);
    tmp := tmp^.next
  end;
  while link <> nil do
  begin
    tmp := link^.next;
    dispose(link);
    link := tmp
  end
end.
