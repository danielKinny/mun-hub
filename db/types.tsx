export interface Delegate {
    id: string;
    firstname: string;
    lastname: string;
    delegation: string;
    committee: string;
    flag: string;
    password: string;
    speechCount: number;
}

export interface Announcement {
    title: string;
    externallink: string;
    description: string;
    date: string;
  }

export interface Country {
    name: string;
    description: string;
    href: string;
    delegates: any[];
    flag: string;
}

export interface Committee {
    name: string;
    description: string;
    href: string;
    delegates: Delegate[];
}

export interface Speech {
    speechID: string;
    title: string;
    content: string;
    tags: string[];
}

export interface Database {
    delegates: Delegate[];
    announcements: Announcement[];
    countries: Country[];
    committees: Committee[];
    speeches: Speech[];
}