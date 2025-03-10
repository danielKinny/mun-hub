export interface Delegate {
    id: string;
    firstname: string;
    delegation: string;
    contactno: string;
    flag: string;
    committee: string;
    password?: string;
}

export interface Committee {
    id: string;
    name: string;
    description: string;
    delegates: Delegate[];
}

export const delegates: Delegate[] = [
    {
        id: '0001',
        firstname: 'John',
        delegation: 'USA',
        contactno: '123-456-7890',
        flag: '🇺🇸',
        committee: 'UNSC',
        password: 'TESTING'
    },
    {
        id: '0002',
        firstname: 'Jane',
        delegation: 'UK',
        contactno: '098-765-4321',
        flag: '🇬🇧',
        committee: 'ECOSOC',
        password: 'TESTING'
    },
    {
        id: '0003',
        firstname: 'Carlos',
        delegation: 'Mexico',
        contactno: '111-222-3333',
        flag: '🇲🇽',
        committee: 'UNODC',
        password: 'TESTING'
    },
    {
        id: '0004',
        firstname: 'Mei',
        delegation: 'China',
        contactno: '444-555-6666',
        flag: '🇨🇳',
        committee: 'ECOSOC',
        password: 'TESTING'
    },
    {
        id: '0005',
        firstname: 'Hans',
        delegation: 'Germany',
        contactno: '777-888-9999',
        flag: '🇩🇪',
        committee: 'UNSC',
        password: 'TESTING'
    },
    {
        id: '0006',
        firstname: 'Priya',
        delegation: 'India',
        contactno: '101-112-1314',
        flag: '🇮🇳',
        committee: 'UNODC',
        password: 'TESTING'
    },
    {
        id: '0007',
        firstname: 'Sanaa',
        delegation: 'Saudi Arabia',
        contactno: '151-617-1819',
        flag: '🇸🇦',
        committee: 'ECOSOC',
        password: 'TESTING'
    },
    {
        id: '0008',
        firstname: 'Kim',
        delegation: 'South Korea',
        contactno: '202-122-2324',
        flag: '🇰🇷',
        committee: 'UNODC',
        password: 'TESTING'
    },
    {
        id: '0009',
        firstname: 'Jacques',
        delegation: 'France',
        contactno: '252-627-2829',
        flag: '🇫🇷',
        committee: 'UNSC',
        password: 'TESTING'
    },
    {
        id: '0010',
        firstname: 'Aminata',
        delegation: 'Nigeria',
        contactno: '303-132-3334',
        flag: '🇳🇬',
        committee: 'ECOSOC',
        password: 'TESTING'
    }
];

export const committees: Committee[] = [
    {
        id: '1',
        name: 'ECOSOC',
        description: 'Economic and Social Council',
        delegates: delegates.filter(delegate => delegate.committee === 'ECOSOC')
    },
    {
        id: '2',
        name: 'UNODC',
        description: 'United Nations Office on Drugs and Crime',
        delegates: delegates.filter(delegate => delegate.committee === 'UNODC')
    },
    {
        id: '3',
        name: 'UNSC',
        description: 'United Nations Security Council',
        delegates: delegates.filter(delegate => delegate.committee === 'UNSC')
    }
];

