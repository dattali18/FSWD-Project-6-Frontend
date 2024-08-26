function convertToDateTime(dateString) {
  // get only the date and not the time
  // format like Tue, 01 Jan 2021
  const date = new Date(dateString);
  return date.toDateString();
}

function convertToTime(dateString) {
  // get a string like 4h or 2d or 3m
  if (!dateString) {
    // console.log("dateString is null");
    return "";
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    // console.log("Invalid date");
    return "";
  }

  const now = new Date();
  const diff = now - date;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return `${seconds}s`;
}

export { convertToDateTime, convertToTime };
