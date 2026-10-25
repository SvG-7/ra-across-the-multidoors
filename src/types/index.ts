export type CommunityType =
  | 'Residence hall'
  | 'Apartment community'
  | 'Both'
  | 'New to the RA role';

export interface DecisionOption {
  id: string;
  label: string;
  consideration?: string;
  channelType?: 'groupchat' | 'directmsg' | 'inperson' | 'email';
}

export interface ChapterStoryDetail {
  id: string;
  label: string;
  description: string;
  iconName: string;
}

export interface ChapterData {
  number: number;
  title: string;
  introduction: string;
  doorTheme: string;
  situation?: string;
  scopeNote?: string;
  hasDecision: boolean;
  decisionPrompt?: string;
  options?: DecisionOption[];
  storyDetails?: ChapterStoryDetail[];
  takeaway: string;
  guideCue: string;
}

export interface AttendeeSession {
  attendeeId: string;
  currentChapter: number; // 1 to 7
  selectedCommunity?: CommunityType;
  answers: Record<number, string>; // chapter number (2, 3, 4, 6) -> optionId
  revealedStoryIds: string[];
}

export interface CollectiveContribution {
  attendeeId: string;
  world: string;
  ch2Choice?: string;
  ch3Choice?: string;
  ch4Choice?: string;
  ch6Choice?: string;
  nodeColor: string;
}

export interface SharedResponses {
  worldDistribution: Record<string, number>;
  chapter2: Record<string, number>;
  chapter3: Record<string, number>;
  chapter4: Record<string, number>;
  chapter6: Record<string, number>;
  totalParticipants: number;
}

export interface WebPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  connections: number[];
  energy: number;
  color: string;
}
