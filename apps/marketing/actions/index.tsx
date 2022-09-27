export const updateAction = (state: any, payload: any) => {
  return {
    ...state,
    data: {
      ...payload,
    },
  };
};
