function convertToDateTime(dateString) {
  // get only the date and not the time
  // format like Tue, 01 Jan 2021
  const date = new Date(dateString);
  return date.toDateString();
}


export { convertToDateTime };