import { useSocket } from '@/shared/contexts/socket.provider';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Message } from '../types/message';
import {
  appendMessageToCache,
  replaceMessageInCache,
  updateSeenMessageToCache,
} from '../lib/message-cache';

export const useSocketMessageEvents = () => {
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
        replaceMessageInCache(
          queryClient,
          data.conversationId,
          data.message,
          data.tempId
        );
        appendMessageToCache(queryClient, data.conversationId, data.message);
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
