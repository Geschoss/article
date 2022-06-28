program types;
uses FileSystem;
var
  f: Sequence;
  // n: word = 10;
  w: word;
begin
  Open(f);
  WriteWord(f, 10);
  WriteWord(f, 11);
  WriteWord(f, 12);
  Reset(f);
  ReadWord(f, w);
  writeln(w);
  ReadWord(f, w);
  writeln(w)
end.