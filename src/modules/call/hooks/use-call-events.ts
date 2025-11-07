import { useSocket } from '@/shared/contexts/socket.provider';
import { useState, useEffect, useRef } from 'react';
import { PayloadCall } from '../types/payload-call';

type CallState = {
  isCalling: boolean; // có đang trong cuộc gọi không
  isIncoming: boolean; // có cuộc gọi đến không
  isOutgoing: boolean; // có đang gọi đi không
  caller?: { id: string; name: string }; // người gọi
  callee?: { id: string; name: string }; // người được gọi
  offer?: RTCSessionDescriptionInit; // dữ liệu offer WebRTC
};

export function useCallEvents() {
  const socket = useSocket();

  const [call, setCall] = useState<CallState>({
    isCalling: false,
    isIncoming: false,
    isOutgoing: false,
  });

  const peerRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!socket) return;

    socket.on('call:offer', ({ callerId, offer, callerName }) => {
      setCall({
        isIncoming: true,
        isOutgoing: false,
        isCalling: false,
        caller: { id: callerId, name: callerName },
        offer,
      });
    });

    socket.on('call:answer', async ({ answer }) => {
      await peerRef.current?.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
      setCall((prev) => ({
        ...prev,
        isCalling: true,
        isOutgoing: false,
        isIncoming: false,
      }));
    });

    return () => {
      socket.off('call:offer');
      socket.off('call:answer');
      socket.off('call:end');
    };
  }, [socket]);

  const startCall = async (payload: PayloadCall) => {
    setCall({
      isCalling: false,
      isOutgoing: true,
      isIncoming: false,
      callee: { id: payload.callerId, name: payload.callerName },
    });

    const peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerRef.current = peer;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    stream.getTracks().forEach((track) => peer.addTrack(track, stream));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit('call:offer', {
      ...payload,
      offer,
    });
  };

  const acceptCall = async (userId: string) => {
    if (!call.offer || !call.caller) return;
    const peer = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerRef.current = peer;

    await peer.setRemoteDescription(new RTCSessionDescription(call.offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit('call:answer', {
      to: call.caller.id,
      answer,
      userId: userId,
    });
    setCall((prev) => ({ ...prev, isCalling: true, isIncoming: false }));
  };

  return {
    call,
    startCall,
    acceptCall,
  };
}
