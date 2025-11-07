import { useSocket } from '@/shared/contexts/socket.provider';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Message } from '../types/message';
import {
  appendMessageToCache,
  replaceMessageInCache,
  updateSeenMessageToCache,
} from '../lib/message-cache';

export const useMessageEvents = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (socket) {
      const handleUpdatedSeenMessage = (data: {
        conversationId: string;
        messageId: string;
        userId: string;
      }) => {
        updateSeenMessageToCache(
          queryClient,
          data.conversationId,
          data.messageId,
          data.userId
        );
      };

      const handleUpdatedNewMessage = (data: {
        conversationId: string;
        message: Message;
        tempId: string;
      }) => {
        if (data.tempId) {
          replaceMessageInCache(
            queryClient,
            data.conversationId,
            data.message,
            data.tempId
          );
        } else {
          appendMessageToCache(queryClient, data.conversationId, data.message);
        }
      };
      socket.on('message:new', handleUpdatedNewMessage);
      socket.on('message:seen:updated', handleUpdatedSeenMessage);
      return () => {
        socket.off('message:new', handleUpdatedNewMessage);
        socket.off('message:seen:updated', handleUpdatedSeenMessage);
      };
    }
  }, [socket, queryClient]);
};
