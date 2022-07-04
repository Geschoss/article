unit Processes;
interface
type
  Signal = char;

procedure Wait(var s: Signal);
procedure Send(var s: Signal);
procedure Init(var s: Siganl);

implementation

end.