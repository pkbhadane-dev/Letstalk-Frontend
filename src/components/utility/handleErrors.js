export const HandleError = (error, rejectWithValue) => {
  const errorMassege = error?.response?.data?.errors[0]?.msg; //validation error
  const customErrMessage = error?.response?.data?.errors; // custom error
  const networkError = error?.message;
  return rejectWithValue(errorMassege || customErrMessage || networkError);
};
