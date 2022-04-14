function solution(statues: number[]) {
    const numbers = statues.sort((a, b) => a - b);
    let count = 0;
    let num = numbers[0];
    let i = 1;
    while (i < numbers.length) {
        if (num + 1 !== numbers[i]) {
            count++;
        } else {
            i++;
        }
        num = num + 1;
    }
    return count;
}
solution([6, 2, 3, 8]); /* ? */ // 3
solution([0, 3]); /* ? */ // 2
solution([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); /* ? */ // 0