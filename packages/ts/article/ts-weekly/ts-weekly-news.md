## ts-weekly-news

### news
?? не уверен что он пока нужен

### helpers
---
#### css
Для удобной работы с `css` и любыми файлами стилей, нужно задекларировать их тип.
Для этого можно создать файл `global.d.ts`(или любое другое название, главное `.d.ts`) в нем мы укажем типы стилей
```
 declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}
```
Это избавит нас от ошибки.
Но есть еще одна штука которая облегчит вам жизнь. 
[typescript-plugin-css-modules](https://github.com/mrmckeb/typescript-plugin-css-modules)
Как им пользоваться почитаете в гите.

#### api contracts types
Если ваша команда на бэке использует `openApi` конфиг файлы, то можно автоматически генерить типы ответов.
Есть разные либы, можно поискать их в гугле.
Я использовал последнии разы [openapi-typescript](https://github.com/drwpow/openapi-typescript), но типы получаются достаточно сложные. Их я использую только в ответах запроса, не пуская эти типы глубже в приложение.
Так же можно типы генерить со свагера.

### tips
---
`ts` одновременно умный и глупый. Он может вывести все типы сам, так может не понимать элементарных вещей. Ну что взять с буздушного алгоритма.
Но выводить типы, там где все правильно написано он умеет очень хорошо.
Яркий пример со `useState`.
```
cosnt [state, setState] = useState<string>('hello');
cosnt [state, setState] = useState('hello'); <- можно не указывать тип `ts` сам поймет.
```
Это так же работает со сложными типами.
Кроме пустых массивов, что логично так как `ts` не может знать что вы положите в массив.
```
cosnt [state, setState] = useState<SomeType>([]); <- тут придется указать тип
```
Похожее указание типы есть у многих функций.
```
const SomeComponent = memo<PropsType>((props) => {...})
```
Если указать тип у самой функции `memo` то переменная `props` автоматом подтянет себе этот тип.
Не нужно будет уже делать так
```
const SomeComponent = memo((props: PropsType) => {...})
```
Так же пример такой.
```
const logError: Thunk<MyError, SomeType> = createAsyncThunk(...
const logError = createAsyncThunk<SomeType, MyError>(... <- код стал более лакончиным
```
Подобные фокусы работают со многими встроенными функциюми `js` аля `Promise.then<SomeType>`, `reduce`, `map` и т.д.
Всегда можно провалиться во встроенную функцию и посмотреть ее типы.


#### enum
В `ts` есть единственный тип данных, которых расширяет типы данных `js-а` - это `enum`.
Есть много разных мнений на счет использовать или нет `enum`. Но мейнтейнеры `ts-а` по большей части рекомендуют исбешать его.
Альтернативой может служить `union type`, например
```
type Status = "Success" | "Error" | "Done";
type size = "m" | "l" | "s";
```
В тех местах где мы будете использовать этот тип `ts` как в случае с `enum` будет делать вам автодополнение.


## tips for starting 4eliks
---
Настройка `ts` это тоже не самый простой вопрос.
Я советую почитайть чужие tsconfigs.ts. Постепенно вы найдете для себя нужные настройки.
Пока можно сделать минимально возможную защиту.
Включить возможность использовать `any` и максимально упростить проверки.
?? тут бы примеры этого упрощения

Выше мы уже обсудили что можно генерить типы для апи автоматически, но я бы советовал начать с описание контрактов с бэком.
Для описания данных которые приходят с бэка обычно использую специфическое описание.
```
type OrderDto = {....};
type ReportDto = {...};
```
Эти типы обычно лежат в файлах формата `someName.dto.ts`.
Это позволит всегда понимать с какими данными вы работаете, те что пришли с бека или то что есть только у вас в приложении. (Всегда разделяйте эти данные)

Так же советую выносить типы сразу в переменные, деже если вы еще не знаете какой тип.
```
type Order = any:

const makeOrder = (): Order => {...};
```
Так вы сможете потом в одном месте указать тип.
Плюс это бесплатная документация.


## Что дальше?
`any` vs `unknown`
более глубокая работа с доменной моделью.
some deep фишки `ts` аля гварды, инфер и т.д.