import supabase from '../config/supabaseClient.js';

export const profilePolls = async (req, res) => {
  const userid = req.user.userId; // userid from JWT

  if (!userid) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { data, error } = await supabase
    .from('polls')
    .select(
      `
    id,
    created_at,
    user_id,
    poll_title,
    is_active,
    share_id,
    poll_options (
      id,
      created_at,
      poll_id,
      option_text,
      vote_count,
      user_id
    )
  `
    )
    .eq('user_id', userid);

  if (error) {
    return res.status(500).json({ message: 'Database error' });
  }

  if (data.length === 0) {
    return res.status(404).json({ message: 'No polls found for that user.' });
  }

  res.status(200).json(data);
};
