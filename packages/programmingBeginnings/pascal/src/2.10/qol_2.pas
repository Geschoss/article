program QOL_2;
type
  ItemPtr = ^Item;
  Item = record
    data: integer;
    next: ItemPtr;
  end;
  Queue  = record
    first: ItemPtr;
    last: ItemPtr;
  end;

procedure QOLInit(var q: Queue);
begin
  q.first := nil;
  q.last := nil;
end;

procedure QOLPut(var q: Queue; var n: integer);
begin
  if q.first = nil then
  begin
    new(q.first);
    q.last := q.first
  end
  else
  begin
    new(q.last^.next);
    q.last := q.last^.next
  end;
  q.last^.data := n;
  q.last^.next := nil;
end;
procedure QOLGet(var q: Queue; var n: integer);
var
  tmp: ItemPtr;
begin
  n := q.first^.data;
  tmp := q.first;
  q.first := q.first^.next;
  if q.first = nil then
    q.last := nil;
  dispose(tmp)
end;

procedure QOLRemove(var q: Queue);
var
  pp: ^ItemPtr;
  tmp: ItemPtr;
begin
  pp := @q.first;
  while pp^ <> nil do
  begin
    if pp^^.data < 0 then
    begin
      tmp := pp^;
      pp^ := pp^^.next;
      dispose(tmp)
    end
    else
      pp := @(pp^^.next)
  end
end;

procedure QOLAdd(var q: Queue; data: integer; index: integer);
var
  pp: ^ItemPtr;
  tmp: ItemPtr;
  i: integer;
begin
  i := 0;
  pp := @q.first;
  while pp^ <> nil do
  begin
    i := i + 1;
    if i = index then
    begin
      new(tmp);
      tmp^.next := pp^;
      tmp^.data := data;
      pp^ := tmp;
      break
    end
    else
      pp := @(pp^^.next)
  end
end;

function QOLIsEmplty(var queue: Queue): boolean;
begin
  QOLIsEmplty := queue.first = nil
end;

var
  q: Queue;
  n: integer;
begin
  QOLInit(q);
  while not SeekEof do
  begin
    read(n);
    QOLPut(q, n)
  end;
  writeln('---');
  QOLAdd(q, 100, 2);
  QOLRemove(q);
  while not QOLIsEmplty(q) do
  begin
    QOLGet(q, n);
    writeln(n)
  end
end.