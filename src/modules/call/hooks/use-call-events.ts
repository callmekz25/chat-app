import { useSocket } from '@/shared/contexts/socket.provider';
import { useState, useEffect, useRef } from 'react';
import { PayloadCall } from '../types/payload-call';
import { Socket } from 'socket.io-client';

export type CallState = {
  isCalling: boolean;
  isIncoming: boolean;
  isOutgoing: boolean;
  caller?: { id: string; name: string };
  callee?: { id: string; name: string };
  offer?: RTCSessionDescriptionInit;
};
const server = [{ urls: 'stun:stun.l.google.com:19302' }];
export function useCallEvents(
  localVideoRef: React.RefObject<HTMLVideoElement>,
  remoteVideoRef: React.RefObject<HTMLVideoElement>
) {
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

    socket.on('call:ice-candidate', async ({ candidate }) => {
      await peerRef.current?.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.off('call:offer');
      socket.off('call:answer');
      socket.off('call:end');
      socket.off('call:ice-candidate');
    };
  }, [socket]);

  const startCall = async (payload: PayloadCall) => {
    if (!socket) return;
    setCall({
      isCalling: false,
      isOutgoing: true,
      isIncoming: false,
      callee: { id: payload.calleeId, name: payload.calleName },
    });

    const peer = new RTCPeerConnection({
      iceServers: server,
    });
    peerRef.current = peer;

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('call:ice-candidate', {
          to: payload.calleeId,
          candidate: e.candidate,
          userId: payload.callerId,
        });
      }
    };

    peer.ontrack = (event) => {
      const remoteVideo = document.getElementById(
        'remote-video'
      ) as HTMLVideoElement;
      if (remoteVideo) remoteVideo.srcObject = event.streams[0];
    };

    const localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    localStream
      .getTracks()
      .forEach((track) => peer.addTrack(track, localStream));

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    socket.emit('call:offer', {
      ...payload,
      offer,
    });
  };

  const acceptCall = async (userId: string) => {
    if (!socket) return;
    if (!call.offer || !call.caller) return;
    setCall((prev) => ({
      ...prev,
      isCalling: true,
      isIncoming: false,
      isOutgoing: false,
    }));

    const peer = new RTCPeerConnection({ iceServers: server });
    peerRef.current = peer;

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        socket.emit('call:ice-candidate', {
          to: call.caller?.id,
          candidate: e.candidate,
          userId,
        });
      }
    };

    peer.ontrack = (event) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    await peer.setRemoteDescription(new RTCSessionDescription(call.offer));

    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    localStream.getTracks().forEach((t) => peer.addTrack(t, localStream));

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    socket.emit('call:answer', {
      to: call.caller.id,
      answer,
      userId: userId,
    });
  };

  const endCall = () => {
    if (peerRef.current) {
      peerRef.current.close();
      peerRef.current = null;
    }
  };

  return {
    call,
    startCall,
    acceptCall,
  };
}
