export interface Delegate {
    id: string;
    firstname: string;
    lastname: string;
    delegation: string;
    committee: string;
    flag: string;
    password: string;
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
    delegates: any[];
}

export interface Speech {
    speechID: string;
    title: string;
    content: string;
}

export interface Database {
    delegates: Delegate[];
    announcements: Announcement[];
    countries: Country[];
    committees: Committee[];
    speeches: Speech[];
}