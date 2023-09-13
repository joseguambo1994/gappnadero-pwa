interface Milk {
    id: string,
    collectionDate: {
        seconds: number;
        nanoseconds: number;
    };
    liters: number,
}

function compareFn(a: Milk, b: Milk) {
    if (a.collectionDate < b.collectionDate) {
      return 1;
    } else if (a.collectionDate >= b.collectionDate) {
      return -1;
    }
    return 0;
  }
export const sortMilkCollectionByDate = (unsortedMilkCollection: Milk[]): Milk[] => {
    return [...unsortedMilkCollection].sort(compareFn)
}