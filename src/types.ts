/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  gender: '公' | '母';
  location: string;
  image: string;
  description: string;
  energy: number;
  playfulness: number;
  training: number;
  shelter: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  time: string;
  isMe: boolean;
}

export interface Chat {
  id: string;
  participantName: string;
  participantAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: Message[];
}

export interface AdoptionRequest {
  id: string;
  petId: string;
  petName: string;
  petBreed: string;
  petImage: string;
  date: string;
  status: '審核中' | '已通過' | '已拒絕';
}

