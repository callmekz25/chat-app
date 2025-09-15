import { Message } from '../types/message';

export function getLastSeenMessageId(
  messages: Message[],
  currentUserId: string
) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.user_id === currentUserId && m.seen_by && m.seen_by.length > 0) {
      return m._id;
    }
  }
  return null;
}
