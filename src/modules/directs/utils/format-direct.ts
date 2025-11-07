import { Direct } from '../types/direct';
import { Participant } from '../types/participant';

export function formatDirect(
  c: Direct | undefined,
  userId: string | undefined
) {
  if (!c || !c.participants || !userId) {
    return {
      _id: c?._id ?? '',
      type: c?.type ?? 'direct',
      name: c?.name ?? 'Unknown',
      participants: [],
      avatar: c?.avatar,
      lastMessage: c?.lastMessage,
    };
  }

  const currentUser = c.participants.find((p) => p.user._id === userId);
  const lastMessage = c.lastMessage;

  const isSeen =
    !!lastMessage &&
    (lastMessage.sendBy._id === userId ||
      lastMessage._id === currentUser?.lastSeenMessage);

  if (c.type === 'group') {
    return {
      _id: c._id,
      type: c.type,
      name: c.name!,
      avatar: c.avatar,
      lastMessage: lastMessage ? { ...lastMessage, isSeen } : null,
    };
  }

  const other = c.participants.find((p: Participant) => p.user._id !== userId);
  return {
    _id: c._id,
    type: c.type,
    name: other?.user.fullName,
    avatar: other?.user.avatar,
    participants: c.participants,
    lastMessage: lastMessage ? { ...lastMessage, isSeen } : null,
  };
}
