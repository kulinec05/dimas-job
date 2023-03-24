type ClassValues = ClassDictionary | string | undefined | null;
type ClassDictionary = Record<string, unknown>;

export function classNames(...values: ClassValues[]): any {
  const newVal = values.filter((it) => it);
  const objects = newVal.reduce((result, it) => {
    if (typeof it === 'object') {
      return {
        ...(result as Record<string, unknown>),
        ...it,
      };
    }
    return result;
  }, {}) as ClassDictionary;

  return [
    ...newVal.filter((it) => typeof it === 'string'),
    ...Object.entries(objects)
      .filter(([_, value]) =>
        typeof value === 'boolean' ? value : Boolean(value),
      )
      .map(([className]) => className),
  ].join(' ');
}
