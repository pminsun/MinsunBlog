const changeDate = (date: string) => {
  const dotDate = date.split("T")[0].slice(-10).replace(/-/g, ".");
  return dotDate;
};

export { changeDate };
