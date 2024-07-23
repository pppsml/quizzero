type TimeUnit =
  | 'year'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'

const timeUnits: [TimeUnit, number][] = [
  ["year", 1000 * 60 * 60 * 24 * 365],
  ["month", 1000 * 60 * 60 * 24 * 30],
  ["week", 1000 * 60 * 60 * 24 * 7],
  ["day", 1000 * 60 * 60 * 24],
  ["hour", 1000 * 60 * 60],
  ["minute", 1000 * 60],
  ["second", 1000],
]

const initialResult: Record<TimeUnit, number> = {
  year: 0,
  month: 0,
  week: 0,
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
}

interface GetRelativeTimeOptions {
  allowFuture?: boolean;
  minuendDate?: Date;
  roundStrategy?: 'floor' | 'round';
}

/**
 * 
 * @param {Date} date allows Date object or timestamp
 * @param options
 * @returns 
 */
export const getRelativeTime = (
  subtrahendDate: Date | number,
  options?: GetRelativeTimeOptions,
): Record<TimeUnit, number> => {
  const {
    allowFuture = false,
    minuendDate = new Date(),
    roundStrategy = 'floor',
  } = (options as Required<GetRelativeTimeOptions>)

  const startTimestamp = subtrahendDate instanceof Date ? subtrahendDate.getTime() : new Date(subtrahendDate).getTime()
  const timeAgo = minuendDate.getTime() - startTimestamp

  if (!allowFuture && timeAgo < 0) return initialResult

  const result = timeUnits.reduce((acc, [unit, threshold], index, arr) => {
    const value = Math[roundStrategy](
      index === 0
        ? Math.abs(timeAgo) / threshold
        : Math.abs(timeAgo) % arr[index - 1][1] / threshold
    )
    // console.log(value)
    if (value >= 1) acc[unit] = value * Math.sign(timeAgo)
    
    return acc
  }, (JSON.parse(JSON.stringify(initialResult)) as Record<TimeUnit, number>))

  return result
}