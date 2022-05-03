program r_list;
type
  itemptr = ^item;
  item = record
    data: integer;
    next: integer;
  end;
function ItemListSum(p: integer): integer;
var
  sum: integer;
  tmp: integer;
begin
  tmp := p;
  sum := 0;
  while tmp <> nil do
  begin
    sum := sum + tmp^.data;
    tmp := tmp^.next;
  end;
  ItemListSum := sum
end;
function ItemListSumR(p: itemptr): integer;
begin
  if p = nil then
    ItemListSumR := 0
  else
    ItemListSumR := p^.data + ItemListSumR(p^.next)
end;
procedure DisposeItemList(p: itemptr);
begin
  if p = nil then
    exit;
  DisposeItemList(p^.next);
  dispose(p)
end;
procedure AddNumIntoSortedList(var p: itemptr; n: integer);
var
  tmp: itemptr;
begin
  if (p = nil) or (p^.data > n) then
  begin
    new(tmp);
    tmp^.data := n;
    tmp^.next := p;
    p := tmp
  end
  else
   AddNumintoSortedList(p^.next, n) 
end;
end.