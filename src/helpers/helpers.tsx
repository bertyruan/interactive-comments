import dayjs from "dayjs";
import plugin from "dayjs/plugin/relativeTime";

dayjs.extend(plugin);

export const date = (function () {
  const format = "DD/MM/YYYY HH:MM:ss";

  return {
    now: dayjs().format(format),
    getTimeLapse: function (date: string) {
      return dayjs().to(dayjs(date, format));
    },
    sortCallback: function (prev: string, curr: string) {
      const prevValue = dayjs(prev, format);
      const currValue = dayjs(curr, format);

      if (prevValue.diff(currValue)) return -1;
      return 1;
    },
  };
})();

export const createId = () => {
  const id = Math.floor(Math.random() * 10000000);
  return id.toString();
};
