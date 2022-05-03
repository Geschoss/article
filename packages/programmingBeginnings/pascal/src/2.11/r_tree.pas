program RTree;
type
  TreeNodePos = ^TreeNodePtr;
  TreeNodePtr = ^TreeNode;
  TreeNode = record
    data: longint;
    left, right: TreeNodePtr;
  end;

function SumTree(p: TreeNodePtr): longint;
begin
  if p = nil then
    SumTree := 0
  else
    SumTree := SumTree(p^.left)
      + p^.data
      + SumTree(p^.right)
end;

function SearchTree(var p: TreeNodePtr; val: longint): TreeNodePos;
begin
  if (p = nil) or (p^.data = val) then
    SearchTree := @p
  else
  if val < p^.data then
    SearchTree := SearchTree(p^.left, val)
  else
    SearchTree := SearchTree(p^.right, val)
end;

procedure AddToTree(var p: TreeNodePtr; val: longint; var ok: boolean);
var
  pos: TreeNodePos;
begin
  pos := SearchTree(p, val);
  if pos^ = nil then
  begin
    new(pos^);
    pos^^.data := val;
    pos^^.left := nil;
    pos^^.right := nil;
    ok := true
  end
  else
    ok := false
end;

procedure IsInTree(var p: TreeNodePtr; val: longint; var res: boolean);

begin
  IsInTree := SearchTree(p, val)^ <> nil
end;


var
  root: TreeNodePtr = nil;
begin
  writeln('-')
end.