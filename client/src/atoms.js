import { atom } from "recoil";

export const isLoginState = atom({
  key: "isLoginState",
  default: false,
});

export const myIdState = atom({
  key: "myIdState",
  default: "",
});

export const myMoveInfoState = atom({
  key: "myMoveInfoState",
  default: {
    id: "",
    x: 0,
    y: 0,
    point: 0,
  },
});

export const playersArrayClientState = atom({
  key: "playersArrayClientState",
  default: [],
});

export const coinsArrayClientState = atom({
  key: "coinsArrayClientState",
  default: [],
});

export const chattingOnState = atom({
  key: "chattingOnState",
  default: false,
});
