import { differenceInDays } from 'date-fns'

export const getPercentageHeat = ( occurrenceDays:number, today: Date, date?: Date ):number => {
    if (!date) return 3;
    const diffInDays = differenceInDays(today, date);
    return Number((diffInDays*100/occurrenceDays).toFixed(0))
  }