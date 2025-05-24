export interface Delegate {
  delegateID: number;
  firstname: string;
  lastname: string;
  speechCount: number;
  password: string;
}

export interface Committee {
  committeeID: number;
  name: string;
}

export interface Country {
  countryID: number;
  name: string;
  flag: string;
}

export interface Delegation {
  delegateID: number;
  committeeID: number;
  countryID: number;
}

export interface Speech {
  speechID: number;
  title: string;
  content: string;
}

export interface DelegateSpeech {
  delegateID: number;
  speechID: number;
}

export interface Announcement {
  announcementID: number;
  date: string;
  title: string;
  content: string;
}

export interface SpeechTag {
  speechID: number;
  tag: string;
}