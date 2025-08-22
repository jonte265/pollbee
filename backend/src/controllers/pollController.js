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

export const sharePoll = async (req, res) => {
  const { data, error } = await supabase
    .from('polls')
    .select('*')
    .eq('share_id', req.params.shareId)
    .single();

  if (!data) {
    return res.status(404).json({ message: `Poll not found` });
  }

  const { data: dataOptions, error: errorOptions } = await supabase
    .from('poll_options')
    .select('*')
    .eq('poll_id', data.id);

  if (!dataOptions) {
    return res.status(404).json({ message: `Poll options not found` });
  }

  // Get poll creator username
  const { data: dataUser, error: errorUser } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user_id)
    .single();

  if (!dataUser) {
    return res.status(404).json({ message: `User not found` });
  }

  return res.json({
    message: `Found poll ${req.params.shareId}`,
    poll_creator: dataUser.username,
    id: data.id,
    created_at: data.created_at,
    user_id: data.user_id,
    poll_title: data.poll_title,
    is_active: data.is_active,
    share_id: data.share_id,
    poll_options: dataOptions,
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
    message: `Added +1 to vote option: ${currentNumData.option_text}`,
  });
};
