program Deque_Prog;
type
  ItemPtr = ^Item;
  Item = record
    data: integer;
    prev, next: ItemPtr;
  end;
  Deque = record
    first: ItemPtr;
    last: ItemPtr;
  end;

procedure Init(deque: Deque);
begin
  deque.first := nil;
  deque.last := nil;
end;

procedure PushFront(var deque: Deque; var n: integer);
var
  tmp: ItemPtr;
begin
  new(tmp);
  tmp^.data := n;
  tmp^.prev := nil;
  tmp^.next := deque.first;
  if deque.first = nil then
    deque.last := tmp
  else
    deque.first^.prev := tmp;
  deque.first := tmp;
end;

procedure PushBack(var deque: Deque; var n: integer);
var
  tmp: ItemPtr;
begin
  new(tmp);
  tmp^.data := n;
  tmp^.prev := deque.last;
  tmp^.next := nil;
  if deque.last = nil then
    deque.first := tmp
  else
    deque.last^.next := tmp;
  deque.last := tmp;
end;

procedure PopFront(var deque: Deque; var n: integer);
var
  tmp: ItemPtr;
begin
  n := deque.first^.data;
  tmp := deque.first;
  deque.first := tmp^.next;
  if deque.first = nil then
    deque.last := nil
  else
    deque.first^.prev := nil;
  dispose(tmp)
end;

procedure PopBack(var deque: Deque; var n: integer);
var
  tmp: ItemPtr;
begin
  n := deque.last^.data;
  tmp := deque.last;
  deque.last := tmp^.prev;
  if deque.last = nil then
    deque.first := nil
  else
    deque.last^.next := nil;
  dispose(tmp)
end;

function IsEmpty(var deque: Deque): boolean;
begin
  IsEmpty := deque.first = nil
end;

var
  d: Deque;
  n: integer;
  tmp: ItemPtr;
begin
  Init(d);
  while not SeekEof do
  begin
    read(n);
    if n > 10 then
      PushBack(d, n)
    else
      PushFront(d, n);
  end;
  writeln('---');
  while not IsEmpty(d) do
  begin
    PopBack(d, n);
    writeln(n);
  end
end.