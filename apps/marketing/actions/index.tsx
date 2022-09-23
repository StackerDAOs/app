export const updateAction = (state: any, payload: any) => {
  console.log({ state, payload });
  return {
    ...state,
    data: {
      ...payload,
    },
  };
};
