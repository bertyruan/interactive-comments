export type Modal = {
  show: boolean;
  callback: () => void;
};

export const DefaultModal: Modal = {
  show: false,
  callback: () => {},
};
