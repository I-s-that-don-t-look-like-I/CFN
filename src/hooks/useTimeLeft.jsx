export const timeLeftCal = _voteEndTime => {
  const endTime = new Date(_voteEndTime * 1000);
  const currDay = new Date();

  let diff = endTime - currDay;
  if (diff <= 0) return '0';
  const diffDays = Math.floor(
    (endTime.getTime() - currDay.getTime()) / (1000 * 60 * 60 * 24)
  );
  diff -= diffDays * (1000 * 60 * 60 * 24);
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  diff -= diffHours * (1000 * 60 * 60);
  const diffMin = Math.floor(diff / (1000 * 60));
  diff -= diffMin * (1000 * 60);
  const diffSec = Math.floor(diff / 1000);

  if (diffDays >= 1) {
    return `${diffDays}일 남음`;
  } else if (diffHours >= 1) {
    return `${diffHours}시간 남음`;
  } else if (diffMin >= 1) {
    return `${diffMin}분 남음`;
  } else if (diffSec >= 1) {
    return `${diffSec}초 남음`;
  } else {
    return `상태 전환 중`;
  }
};
