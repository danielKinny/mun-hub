
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
  delegateID: string;
  tags: string[];
}

export interface Update {
  updateID: string;
  date: string;
  title: string;
  content: string;
  href: string;
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


export interface Article {

  source: {
    id: string;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface Admin {
  adminID :string;
  firstname: string;
  lastname: string;
  password: string;
}
