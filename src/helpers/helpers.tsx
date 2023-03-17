export const getDateString = () => {
  const date = new Date();
  const utcdate = date.getUTCDate();
  return utcdate.toString();
};

export const createId = () => {
  const id = Math.floor(Math.random() * 10000000);
  return id.toString();
};
