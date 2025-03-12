export interface Delegate {
    id: string;
    firstname: string;
    lastname: string;
    delegation: string;
    committee: string;
    flag: string;
    password: string;
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

export interface Database {
    delegates: Delegate[];
    countries: Country[];
    committees: Committee[];
}