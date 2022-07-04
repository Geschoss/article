program types;
uses FileSystem, Buffer;
var
  f: Sequence;
  w: word;
begin
  Open(f);
  WriteWord(f, 10);
  WriteWord(f, 11);
  WriteWord(f, 12);
  Reset(f);
  while f.eof = false do
  begin
    ReadWord(f, w);
    writeln(w);
  end;
  deposite(2223);
  fetch(w);
  writeln(w)
end.