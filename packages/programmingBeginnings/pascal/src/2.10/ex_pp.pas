program exPointertoPointers;
type
   iptr = ^integer;
   pointerptr = ^ iptr;

var
   num: integer;
   ptr: iptr;
   pptr: pointerptr;
   x, y : ^word;

begin
   num := 3000;
   writeln('Value of num = ', num );
   
   (* take the address of var *)
   ptr := @num;
   x := addr(ptr);
   writeln('Address at ptr = ', x^); 
   
   (* take the address of ptr using address of operator @ *)
   pptr := @ptr;
   y := addr(pptr);
   writeln('Address at pptr = ', y^);
   
   (* let us see the value and the adresses *)
   
   writeln('Value available at ptr^ = ', ptr^ );
   writeln('Value available at pptr^^ = ', pptr^^);
end.