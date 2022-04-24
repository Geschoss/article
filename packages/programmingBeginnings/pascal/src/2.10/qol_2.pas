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
  while not QOLIsEmplty(q) do
  begin
    QOLGet(q, n);
    writeln(n)
  end
end.