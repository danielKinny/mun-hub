export interface Delegate {
  delegateID: string;
  firstname: string;
  lastname: string;
  speechCount: number;
  password: string;
}

export interface Committee {
  committeeID: string;
  name: string;
  href: string;
}

export interface Country {
  countryID: string;
  name: string;
  flag: string;
}

export interface Delegation {
  delegateID: string;
  committeeID: string;
  countryID: string;
}

export interface Speech {
  speechID: string;
  title: string;
  content: string;
}

export interface DelegateSpeech {
  delegateID: string;
  speechID: string;
}

export interface Announcement {
  announcementID: string;
  date: string;
  title: string;
  content: string;
  href: string;
}

export interface SpeechTag {
  speechID: string;
  tag: string;
}