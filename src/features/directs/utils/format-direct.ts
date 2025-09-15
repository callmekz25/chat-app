import { Message } from '@/features/messages/types/message';
import { Direct } from '../types/direct';
import { Participant } from '../types/participant';
import { Profile } from '@/features/profile/types/profile';

export function formatDirect(
  c: Direct | undefined,
  user_id: string | undefined
) {
  if (!c || !c.participants || !user_id) {
    return {
      _id: c?._id ?? '',
      type: c?.type ?? 'direct',
      name: c?.name ?? 'Unknown',
      user_name: undefined,
      participants: [],
      avatar: c?.avatar,
      last_message_at: c?.last_message_at,
      last_message: (c?.last_message as Message) ?? ({} as Message),
    };
  }

  const currentUser = c.participants.find(
    (p) => (p.user as Profile)._id === user_id
  );
  const lastMessage = c.last_message as Message;

  const isSeen =
    !!lastMessage &&
    (lastMessage.user_id === user_id ||
      lastMessage._id === currentUser?.last_seen_message);

  if (c.type === 'group') {
    return {
      _id: c._id,
      type: c.type,
      name: c.name!,
      avatar: c.avatar,
      last_message_at: c.last_message_at,
      last_message: lastMessage
        ? { ...lastMessage, is_seen: isSeen }
        : ({} as Message),
    };
  }

  const other = c.participants.find(
    (p: Participant) => (p.user as Profile)._id !== user_id
  );
  return {
    _id: c._id,
    type: c.type,
    name: (other?.user as Profile).full_name,
    user_name: (other?.user as Profile).user_name,
    avatar: {
      url: (other?.user as Profile).avatar_url ?? '',
      public_id: (other?.user as Profile).avatar_public_id ?? '',
    },
    last_message_at: c.last_message_at,
    last_message: lastMessage
      ? { ...lastMessage, is_seen: isSeen }
      : ({} as Message),
  };
}
