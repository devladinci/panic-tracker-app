/* eslint-disable no-bitwise */
export function timeFormat(time: number, words?: boolean) {
  // Hours, minutes and seconds
  var hrs = ~~(time / 3600);
  var mins = ~~((time % 3600) / 60);
  var secs = ~~time % 60;

  var ret = '';
  const hoursMerger = words ? 'h ' : ':';
  const minutesMerger = words ? 'm ' : ':';
  const secondsMerger = words ? 's' : '';

  if (hrs > 0) {
    ret += '' + hrs + hoursMerger + (mins < 10 ? '0' : '');
  }

  if (mins > 0) {
    ret += '' + mins + minutesMerger + (secs < 10 ? '0' : '');
  }

  ret += '' + secs + secondsMerger;

  return ret;
}
/* eslint-enable no-bitwise */
