export const linuxTimeToDayTime = _linuxTime => {
  _linuxTime = new Date(_linuxTime * 1000);
  const monthArr = [
    '01월',
    '02월',
    '03월',
    '04월',
    '05월',
    '06월',
    '07월',
    '08월',
    '09월',
    '10월',
    '11월',
    '12월',
  ];

  function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  const year = _linuxTime.getFullYear();
  const month = _linuxTime.getMonth();
  const pMonth = pad(_linuxTime.getMonth(), 2);
  const date = _linuxTime.getDate();
  const pDate = pad(_linuxTime.getDate(), 2);
  const day = _linuxTime.getDay();
  const hours = _linuxTime.getHours();
  const pHours = pad(_linuxTime.getHours(), 2);
  const minutes = _linuxTime.getMinutes();
  const pMinutes = pad(_linuxTime.getMinutes(), 2);
  const seconds = _linuxTime.getSeconds();
  const pSeconds = pad(_linuxTime.getSeconds(), 2);
  const YYYYMMDD = year + pMonth + pDate;
  const YYYY_MM_DD = year + '년 ' + monthArr[month] + ' ' + pDate + '일';
  const HMS = pHours + '시' + pMinutes + '분' + pSeconds + '초';
  return {
    year,
    month,
    pMonth,
    date,
    pDate,
    day,
    hours,
    pHours,
    minutes,
    pMinutes,
    seconds,
    YYYYMMDD,
    YYYY_MM_DD,
    HMS,
  };
};
