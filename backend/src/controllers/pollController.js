import supabase from '../config/supabaseClient.js';
import { nanoid } from 'nanoid';

export const createPoll = async (req, res) => {
  const { userid, polltitle, active, options } = req.body;

  if (!userid || !polltitle || !active || !options) {
    return res.status(400).json({ message: `Fields missing` });
  }

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

export const votePoll = async (req, res) => {
  const { voteoption } = req.body;

  const { data: currentNumData, error: currentNumError } = await supabase
    .from('poll_options')
    .select('*')
    .eq('id', voteoption)
    .single();

  console.log(currentNumData);

  const updateNum = currentNumData.vote_count + 1;

  const { data, error } = await supabase
    .from('poll_options')
    .update({ vote_count: updateNum })
    .eq('id', voteoption)
    .select();

  return res.json({
    message: `Added +1 to share_id: ${req.params.shareId} vote option: ${currentNumData.option_text}`,
  });
};
