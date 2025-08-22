import supabase from '../config/supabaseClient.js';

export const createPoll = async (req, res) => {
  const { userid, polltitle, active } = req.body;

  const { data, error } = await supabase
    .from('polls')
    .insert({
      user_id: userid,
      poll_title: polltitle,
      is_active: active,
      share_id: Math.floor(Math.random() * 100000),
    })
    .select();

  //   console.log(data);
  console.log(data);
  console.log(error);

  if (!data) {
    return res.status(400).json({ message: 'Error null' });
  }

  return res.status(201).json({ message: `Added poll: ${polltitle}` });
};
