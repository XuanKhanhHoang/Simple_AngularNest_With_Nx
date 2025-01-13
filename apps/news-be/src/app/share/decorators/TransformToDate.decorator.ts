import { Transform } from 'class-transformer';

export function TransformAndValidateDate() {
  return Transform(({ value }) => {
    const decodedDate = decodeURIComponent(value);
    const date = new Date(decodedDate);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date format');
    }
    return date;
  });
}
