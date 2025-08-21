export const createUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `No username or password provided` });
  }

  res.status(201).json({ message: `Registered: ${username} ${password}` });
};

export const deleteUser = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `No username or password provided` });
  }

  res.status(200).json({ message: `Deleted: ${username}` });
};
