export const timeFormat = (time) => {
  const date = new Date(time);
  const yyyy = date.getFullYear();
  const mm = preAddZero((date.getMonth() + 1).toString(), 2);
  const dd = preAddZero(date.getDate().toString(), 2);

  return `${yyyy}-${mm}-${dd}`;
};

const preAddZero = (str: string, length: number): string => {
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
};
