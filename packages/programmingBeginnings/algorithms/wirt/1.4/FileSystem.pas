unit FileSystem;
interface
const
  MaxLength = 4096;
type
  Sequence = record 
    pos, length: integer;
    eof: boolean;
    a: ARRAY [0..MaxLength-1] of word;
  end;

procedure Open(var f: Sequence);
procedure WriteWord(var f: Sequence; w: word);
procedure Reset(var f: Sequence);
procedure ReadWord(var f: Sequence; var w: word);
procedure Close(var f: Sequence);

implementation


procedure Open(var f: Sequence);
begin
  f.length := 0;
  f.pos := 0;
  f.eof := FALSE
end;

procedure WriteWord(var f: Sequence; w: word);
begin
  if f.pos < MaxLength then
  begin
    f.a[f.pos] := w;
    f.pos := f.pos + 1;
    f.length := f.pos;
  end
  else
    halt(1)
end;

procedure Reset(var f: Sequence);
begin
  f.pos := 0;
  f.eof := FALSE
end;

procedure ReadWord(var f: Sequence; var w: word);
begin
  if f.pos = f.length then
    f.eof := TRUE
  else
  begin
    w := f.a[f.pos];
    f.pos := f.pos + 1
  end
end;

procedure Close(var f: Sequence);
begin
  
end;
end.