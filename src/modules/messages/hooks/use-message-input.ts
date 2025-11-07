import { uploadFile } from '@/modules/upload/upload.services';
import { AttachmentType } from '../enums/attachment.enum';
import { appendMessageToCache } from '../lib/message-cache';
import { SendMessage } from '../types/send-message';
import { MessageType } from '../enums/message-type.enum';
import { useQueryClient } from '@tanstack/react-query';
import { useSocket } from '@/shared/contexts/socket.provider';
import { useParams } from 'react-router-dom';
import React from 'react';
import { Message } from '../types/message';
import { detectFileType } from '@/shared/utils/detect-file-type';
import { UploadedFileResponse } from '../types/uploaded-file-response';
import { User } from '@/modules/user/types/user';

type PreviewFile = {
  file: File;
  url: string;
  type: AttachmentType;
  fileName?: string;
  fileSize?: number;
};

export const useMessageInput = (messageReply: Message | null, user?: User) => {
  const queryClient = useQueryClient();
  const socket = useSocket();
  const { conversationId } = useParams();
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimeoutRef = React.useRef<number | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = React.useState('');
  const [previewFiles, setPreviewFiles] = React.useState<PreviewFile[]>([]);

  const userId = user?._id;
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (socket) {
      const value = e.target.value;
      setMessage(value);

      const el = textareaRef.current;
      if (el) {
        el.style.height = 'auto';
        el.style.height = el.scrollHeight + 'px';
      }

      if (!isTyping) {
        socket.emit('conversation:typing', {
          conversationId,
          userId,
        });
        setIsTyping(true);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('conversation:stopTyping', {
          conversationId,
          userId,
        });
        setIsTyping(false);
      }, 3000);
    }
  };

  const insertEmoji = (emoji: string) => {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart;
    const end = el.selectionEnd;

    const newMessage = message.slice(0, start) + emoji + message.slice(end);

    setMessage(newMessage);

    requestAnimationFrame(() => {
      el.selectionStart = el.selectionEnd = start + emoji.length;
      el.style.height = 'auto';
      el.style.height = el.scrollHeight + 'px';
      el.focus();
    });

    if (socket) {
      if (!isTyping) {
        socket.emit('conversation:typing', { conversationId, userId });
        setIsTyping(true);
      }

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('conversation:stopTyping', { conversationId, userId });
        setIsTyping(false);
      }, 3000);
    }
  };

  const handleSendMessage = async () => {
    if (!socket) return;

    if (message === '' && previewFiles.length === 0) {
      return;
    }
    let uploadedAttachments: UploadedFileResponse[] | [] = [];
    let tempId = null;
    // Add temp message to cache for render and upload images
    // Send event send to save message and event new replace temp message
    if (previewFiles.length > 0) {
      tempId = crypto.randomUUID();
      const tempMessage: Message = {
        tempId: tempId.toString(),
        conversationId: conversationId!,
        sendBy: user!,
        message: message,
        isDeleted: false,
        isEdited: false,
        messageType: MessageType.TEXT,
        attachments: previewFiles.map((p) => {
          return {
            type: p.type,
            isLoading: true,
          };
        }),
        createdAt: new Date().toISOString(),
      };

      handleRemoveAllFile();
      appendMessageToCache(queryClient, conversationId!, tempMessage);

      uploadedAttachments = await uploadFile({
        files: previewFiles.map((p) => p.file),
      });
    }
    const payload: SendMessage = {
      conversationId: conversationId!,
      message,
      tempId: tempId ? tempId.toString() : null,
      messageType: MessageType.TEXT,
      attachments: uploadedAttachments,
      replyMessageId: messageReply?._id?.toString() || null,
    };
    socket.emit('message:send', payload);

    socket.emit('conversation:stopTyping', {
      conversationId,
      userId,
    });
    setIsTyping(false);
    setMessage('');
  };

  const handleSelectedFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles || selectedFiles.length === 0) return;

    const newFiles = Array.from(selectedFiles).map((file) => {
      return {
        file,
        url: URL.createObjectURL(file),
        type: detectFileType(file.type),
        fileName: file.name,
        fileSize: file.size,
      };
    });

    setPreviewFiles((prev) => [...prev, ...newFiles]);

    e.target.value = '';
  };

  const handleRemoveFile = (name: string) => {
    setPreviewFiles((prev) => {
      return prev.filter((item) => item.file.name !== name);
    });
  };

  const handleRemoveAllFile = () => {
    previewFiles.forEach(({ url }) => URL.revokeObjectURL(url));
    setPreviewFiles([]);
  };

  React.useEffect(() => {
    return () => handleRemoveAllFile();
  }, []);
  if (!userId) {
    return {
      message: '',
      textareaRef: null,
      previewFiles: [],
      handleInputChange: () => {},
      handleSelectedFiles: () => {},
      handleRemoveFile: () => {},
      handleSendMessage: async () => {},
    };
  }
  return {
    message,
    textareaRef,
    previewFiles,
    insertEmoji,
    handleInputChange,
    handleSelectedFiles,
    handleRemoveFile,
    handleSendMessage,
  };
};
