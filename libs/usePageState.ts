const useSortedData = (data: any, sortedContent: string) => {
  const sortedData = sortedContent === 'registration' ? data.reverse() : data
  return sortedData
}

export { useSortedData }
