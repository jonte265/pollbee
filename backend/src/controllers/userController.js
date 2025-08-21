import supabase from '../config/supabaseClient.js';

export const createUser = async (req, res) => {
  let { username, password } = req.body;

  // No space username
  if (username.includes(' ')) {
    return res
      .status(400)
      .json({ message: `Username/password cannot contain spaces` });
  }

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `No username or password provided` });
  }

  try {
    const { data, error } = await supabase.from('users').insert({
      username: username,
      password: password,
    });

    if (error) {
      return res
        .status(500)
        .json({ message: `Error supabase: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
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
