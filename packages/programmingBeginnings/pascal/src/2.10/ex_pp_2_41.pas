program Ex_pointers_2_41;
type
  itemptr = ^item;
  item = record
    value: integer;
    count: integer;
    next: itemptr;
  end;
function FindNode(first: itemptr; n: integer): itemptr;
var
 tmp: itemptr; 
begin
  tmp := first;
  while tmp <> nil do
  begin
    if tmp^.value = n then
      break
    else
      tmp := tmp^.next
  end;
  FindNode := tmp
end;
procedure PrintList(first: itemptr; max: integer);
var
  tmp: itemptr;
begin
  tmp := first;
  while tmp <> nil do
  begin
    if (tmp^.value = max) then
    begin
      write(tmp^.value);
      write(' | ');
      write(tmp^.count);
      writeln
    end;
    tmp := tmp^.next
  end;
end;
procedure Free(first: itemptr);
var
 tmp: itemptr; 
begin
  while first <> nil do
  begin
    tmp := first^.next;
    dispose(first);
    first := tmp
  end
end;
var
  first: itemptr;
  tmp: itemptr;
  n: integer;
  max: integer;
begin
  max := 0;
  first := nil;
  while not SeekEof do
  begin
    read(n);
    tmp := FindNode(first, n);
    if tmp = nil then
    begin
      new(tmp);
      tmp^.value := n;
      tmp^.count := 1;
      tmp^.next := first;
      first := tmp
    end
    else
      tmp^.count := tmp^.count + 1;
    
    if max < tmp^.count then
      max := tmp^.count

  end;
  writeln('-');
  
  PrintList(first, max);
  Free(first)
end.
