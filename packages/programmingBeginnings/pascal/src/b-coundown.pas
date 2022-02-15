program countdown;
var
    i: integer;
begin
    for i := 20 downto 1 do
        write(i, '...');
    writeln('start!');
end.
