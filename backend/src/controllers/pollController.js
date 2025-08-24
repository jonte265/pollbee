import supabase from '../config/supabaseClient.js';
import { nanoid } from 'nanoid';

export const createPoll = async (req, res) => {
  const { polltitle, active, options } = req.body;
  const userid = req.user.userId; // userid from JWT

  if (!polltitle || active === undefined || !options) {
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
    user_id: userid,
  }));

  const { error: optionsError } = await supabase
    .from('poll_options')
    .insert(optionsToInsert);

  return res.status(201).json({
    message: `Added poll: ${polltitle}`,
    poll: data,
    share_url: `http://localhost:3008/poll/${uniqueId}`,
  });
};

export const editPoll = async (req, res) => {
  const { pollid, polltitle, active, options, optionsid } = req.body;
  const userid = req.user.userId; // userid from JWT

  const { data: rowData, error: rowError } = await supabase
    .from('polls')
    .select('*')
    .eq('id', pollid)
    .single();

  if (rowError) {
    return res.status(404).json({ message: `Poll Id not found` });
  }

  if (rowData.user_id !== userid) {
    return res.status(403).json({ message: 'Unauthorized forbidden' });
  }

  const { data: rowOptionsData, error: rowOptionsError } = await supabase
    .from('poll_options')
    .select('*')
    .eq('id', optionsid)
    .single();

  if (rowOptionsError) {
    return res.status(404).json({ message: `Poll Options Id not found` });
  }

  if (rowOptionsData.user_id !== userid) {
    return res.status(403).json({ message: 'Unauthorized forbidden options' });
  }

  if (polltitle) {
    const { data, error } = await supabase
      .from('polls')
      .update({ poll_title: polltitle })
      .eq('id', pollid)
      .select()
      .single();

    if (error) {
      return res.status(400).json({ message: 'No poll id found' });
    }
  }

  if (options) {
    const { data: optionsData, error: optionsError } = await supabase
      .from('poll_options')
      .update({ option_text: options })
      .eq('id', optionsid)
      .select()
      .single();

    if (optionsError) {
      return res.status(400).json({ message: 'No options id found' });
    }
  }

  if (!active !== undefined) {
    const { data: activeData, error: activeError } = await supabase
      .from('polls')
      .update({ is_active: active })
      .eq('id', pollid)
      .select()
      .single();

    if (activeError) {
      return res.status(400).json({ message: 'No is_active found' });
    }
  }

  res.json({ message: `Edited poll` });
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

  if (currentNumError) {
    return res.status(404).json({ message: `Id not found` });
  }

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

export const deletePoll = async (req, res) => {
  const { pollid } = req.body;
  const userid = req.user.userId; // userid from JWT

  if (!pollid) {
    return res.status(400).json({ message: 'Missing pollid' });
  }

  const { data: rowData, error: rowError } = await supabase
    .from('polls')
    .select('*')
    .eq('id', pollid)
    .single();

  if (!rowData) {
    return res.status(404).json({ message: 'Poll not found' });
  }

  if (rowData.user_id !== userid) {
    return res.status(403).json({ message: 'Unauthorized forbidden' });
  }

  const { data, error } = await supabase
    .from('polls')
    .delete()
    .eq('id', pollid)
    .select()
    .single();

  if (error) {
    return res.status(400).json({ message: 'No poll id found' });
  }

  res.json({ message: `Deleted poll ${data.poll_title}` });
};
