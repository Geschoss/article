program repeat1;
var
    x: integer;
    sum: integer;
begin
    sum := 0;
    repeat
        readln(x);
        sum := sum + x
    until sum > 1000
end.