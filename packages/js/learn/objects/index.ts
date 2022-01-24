/**
 * можете заметить как мы может типами описать
 * наш объект, для того что бы случайно
 * не ошибиться в данных
 */
type Order = {
    status: 'created' | 'ready' | 'close' | 'canceled';
    customer: string;
    date: string;
    price: number;
    products: string[];
}

/**
 * 
 */
export const makeHelloMsg = (order: Order) => {
    return `Hello ${order.} ${order.lastName}`;
}



type Color = 'red' | 'blue' | 'black';

type ColorsSize = {
    [K in Color]: number; // error
};

const colorMap: ColorsSize = {
    red: 2,
    blue: 3,
    black: 4,
		yellow: 5, // error
};