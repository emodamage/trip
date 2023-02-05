import dayjs from 'dayjs'
export function formatMonthDay(date) {
  return dayjs(date).format('MM月DD日')
}