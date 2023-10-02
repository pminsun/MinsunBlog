const changeDate = (date: string) => {
  const dotDate = date.replace(/-/g, ".");
  return dotDate;
};

export { changeDate };
