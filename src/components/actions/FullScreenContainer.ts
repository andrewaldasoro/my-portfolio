import { Action, createStore, Reducer } from "redux";

interface ChangeSizeActions {
  type: "FULL_SCREEN_SIZE" | "NORMAL_SIZE";
}

export const fullScreenSize = (): Action => {
  return {
    type: "FULL_SCREEN_SIZE",
  };
};

export const normalSize = (): Action => {
  return {
    type: "NORMAL_SIZE",
  };
};

const changeSizeReducer: Reducer<boolean, ChangeSizeActions> = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _prevStyle = false,
  action
) => {
  switch (action.type) {
    case "FULL_SCREEN_SIZE":
      return true;

    case "NORMAL_SIZE":
      return false;
  }
};

export const changeSizeStore = createStore(changeSizeReducer);
