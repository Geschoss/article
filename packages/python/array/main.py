def twice(arr):
    list = []
    for x in arr:
        list.append(x * 2)
    return list


def myMap(callback, arr):
    list = []
    for value in arr:
        list.append(callback(value))
    return list


def myAppend(value, arr):
    arr[len(arr):] = [value]


result = myMap(lambda x: x * 2, [1, 2, 3, 4])
print(result)

myAppend(5, result)
print(result)

print(0.2 * 0.2)