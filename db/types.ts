
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
  date: string;
  tags: string[];
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

export interface jargons {
  name: string;
  description: string;
}

export interface Delegate {
  delegateID: string;
  firstname: string;
  lastname: string;
  speechCount: number;
  password: string;
  country: Country;
  committee: Committee;
}
