export const createUser = (req, res) => {
  const { userName, password } = req.body;

  res.json({ message: `Registered: ${userName}` });
};
