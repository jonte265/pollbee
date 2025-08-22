import supabase from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs';

export const createUser = async (req, res) => {
  let { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: `No username or password provided` });
  }

  // No space username
  if (username.includes(' ')) {
    return res.status(400).json({ message: `Username cannot contain spaces` });
  }

  // No uppercase
  if (username !== username.toLowerCase()) {
    return res
      .status(400)
      .json({ message: `Username must contain only lowercase letters` });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: `Password must be longer than 8 characters.` });
  }

  // Check if existing user
  const result = await supabase
    .from('users')
    .select('username')
    .eq('username', username);

  if (result.data.length > 0) {
    return res
      .status(400)
      .json({ message: `Username: ${username} is already taken.` });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const { data, error } = await supabase.from('users').insert({
      username: username,
      password: hashedPassword,
    });

    if (error) {
      return res
        .status(500)
        .json({ message: `Error supabase: ${error.message}` });
    }
  } catch (error) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }

  res.status(201).json({ message: `User ${username} registered` });
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
