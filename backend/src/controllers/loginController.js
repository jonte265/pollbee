export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  res.json({ message: 'login here' });
};
