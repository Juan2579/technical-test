export const getPostedDate = (dateString: string) => {
  return new Date(dateString).toLocaleString("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
