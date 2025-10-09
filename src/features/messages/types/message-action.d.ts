import {type Message} from '@/features/messages/types/message';

export type MessageAction = {
    message: Message
    action: 'EMOJI' | 'REPLY' | 'FORWARD'

}