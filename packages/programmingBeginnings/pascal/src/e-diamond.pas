program diamond;
procedure PrintChar(count: integer; ch: char);
var
    i: integer;
begin
    for i := 1 to count do
        write(ch)
end;
procedure PrintLineOfDiamond(k, n: integer);
begin
    PrintChar(n + 1 - k, ' ');
    write('*');
    if k > 1 then
    begin
        PrintChar(2*k - 3, ' ');
        write('*')
    end;
    // PrintChar(n + 1 - k, '*'); 
    writeln
end;
var
    n, k, h, i: integer;
begin
    { ввод числа, пока пользователь не введет его как надо }
    repeat
        write('Enter the diamond''s height (positive odd): ');
        // readln(h)
        h := 7;
        writeln
    until (h > 0) and (h mod 2 = 1);
    n := h div 2;
    { печать верхней части фигуры}
    for k := 1 to n + 1 do
    begin
        PrintLineOfDiamond(k, n);
    end;
    { печать нижней части }
    for k := n downto 1 do
    begin
        PrintLineOfDiamond(k, n);
    end
end.
