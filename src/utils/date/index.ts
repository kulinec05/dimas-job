import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const convertDate = (date: string | Date | undefined) => {
  if (!date) return '';
  const day = new Date(date).getDate();
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return `${day < 10 ? '0' + day : day}-${
    month < 10 ? '0' + month : month
  }-${year}`;
};

export const convertTime = (date: string | Date | undefined) => {
  if (!date) return '';
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  // const seconds = new Date(date).getSeconds();

  const convertTime = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`; //:${seconds < 10 ? `0${seconds}` : seconds}

  return convertTime;
};

export const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
export const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return current && current < dayjs().endOf('day');
};

export const disabledDateTime = () => ({
  disabledHours: () => range(0, 24).splice(4, 20),
  disabledMinutes: () => range(30, 60),
  disabledSeconds: () => [55, 56],
});

export { dayjs };
