export const getHealth = (req, res) => {
  res.json({
    status: "OK",
    message: "Lecturer Teaching Companion API is running"
  });
};