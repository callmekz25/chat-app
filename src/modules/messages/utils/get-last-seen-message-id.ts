import { Message } from '../types/message';

export function getLastSeenMessageId(
  messages: Message[],
  currentUserId: string
) {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.sendBy === currentUserId && m.seenBy && m.seenBy.length > 0) {
      return m._id;
    }
  }
  return null;
}
