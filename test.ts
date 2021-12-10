const map = (start1: number, stop1: number, start2: number, stop2: number) => (value: number, ) => ((value-start1)/(stop1-start1))*(stop2-start2)+start2;


map(0, 400, -1, 1) /* ? */ // -1