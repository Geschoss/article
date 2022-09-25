const key_store = new WeakMap<object, string>();

export function stringify<Value>(obj: Value): string {
  return JSON.stringify(obj, (_, value) => {
    if (!value) return value;
    if (typeof value !== 'object' && typeof value !== 'function') return value;
    if (Array.isArray(value)) return value;

    const proto = Reflect.getPrototypeOf(value);
    if (!proto) return value;
    if (Reflect.getPrototypeOf(proto) === null) return value;

    if ('toJSON' in value) return value;
    if (value instanceof RegExp) return value.toString();

    let key = key_store.get(value);
    if (key) return key;

    key = guid();
    key_store.set(value, key);

    return key;
  });
}

export function guid(
  length = 8,
  exists: (id: string) => boolean = () => false
) {
  for (;;) {
    let id = Math.random()
      .toString(36)
      .substring(2, length + 2)
      .toUpperCase();

    if (exists(id)) continue;

    return id;
  }
}
guid() /* ? */
