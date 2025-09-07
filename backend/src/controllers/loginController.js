import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabaseClient.js';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  // console.log(data);

  if (!data) {
    return res.status(404).json({ message: 'User not found' });
  }

  const isPasswordCorrect = await bcrypt.compare(password, data.password);

  if (!isPasswordCorrect) {
    return res.status(401).json({ message: 'Wrong credentials' });
  }

  const token = jwt.sign(
    {
      userId: data.id,
      username: data.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.status(200).json({
    message: `Login successful`,
    token: token,
    username: data.username,
  });
};
