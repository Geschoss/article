program year100;
var
    year: integer;
begin
    write('Please type in you birth year: ');
    readln(year);
    while (year < 1900) or (year > 2022) do
    begin
        writeln(year, ' is not a vaild year!');
        write('Please try again: ');
        readln(year)
    end;
    writeln('The year ', year, ' is accepted. Thank you!');
end.
