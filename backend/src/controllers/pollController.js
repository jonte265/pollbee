import supabase from '../config/supabaseClient.js';
import { nanoid } from 'nanoid';

export const createPoll = async (req, res) => {
  const { userid, polltitle, active, options } = req.body;

  const uniqueId = nanoid(8);

  const { data, error } = await supabase
    .from('polls')
    .insert({
      user_id: userid,
      poll_title: polltitle,
      is_active: active,
      share_id: uniqueId,
    })
    .select()
    .single();

  if (!data) {
    return res.status(400).json({ message: 'Error null' });
  }

  let optionsToInsert = [];
  optionsToInsert = options.map((option) => ({
    poll_id: data.id,
    option_text: option,
  }));

  console.log(optionsToInsert);

  const { error: optionsError } = await supabase
    .from('poll_options')
    .insert(optionsToInsert);

  console.log(optionsError);

  return res.status(201).json({
    message: `Added poll: ${polltitle}`,
    poll: data,
    share_url: `http://localhost:3008/poll/${uniqueId}`,
  });
};
