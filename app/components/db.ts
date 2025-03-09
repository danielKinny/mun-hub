interface Delegate {
    id: string;
    firstname: string;
    delegation: string;
    contactno: string;
    flag: string;
    committee: string;
    password?: string;
}

const delegates: Delegate[] = [
    {
        id: '0001',
        firstname: 'John',
        delegation: 'USA',
        contactno: '123-456-7890',
        flag: '🇺🇸',
        committee: 'Security Council',
        password: 'TESTING'
    },
    {
        id: '0002',
        firstname: 'Jane',
        delegation: 'UK',
        contactno: '098-765-4321',
        flag: '🇬🇧',
        committee: 'General Assembly',
        password: 'TESTING'
    },
    {
        id: '0003',
        firstname: 'Carlos',
        delegation: 'Mexico',
        contactno: '111-222-3333',
        flag: '🇲🇽',
        committee: 'Human Rights Council',
        password: 'TESTING'
    },
    {
        id: '0004',
        firstname: 'Mei',
        delegation: 'China',
        contactno: '444-555-6666',
        flag: '🇨🇳',
        committee: 'Economic and Social Council',
        password: 'TESTING'
    },
    {
        id: '0005',
        firstname: 'Hans',
        delegation: 'Germany',
        contactno: '777-888-9999',
        flag: '🇩🇪',
        committee: 'Security Council',
        password: 'TESTING'
    },
    {
        id: '0006',
        firstname: 'Priya',
        delegation: 'India',
        contactno: '101-112-1314',
        flag: '🇮🇳',
        committee: 'General Assembly',
        password: 'TESTING'
    },
    {
        id: '0007',
        firstname: 'Sanaa',
        delegation: 'Saudi Arabia',
        contactno: '151-617-1819',
        flag: '🇸🇦',
        committee: 'Human Rights Council',
        password: 'TESTING'
    },
    {
        id: '0008',
        firstname: 'Kim',
        delegation: 'South Korea',
        contactno: '202-122-2324',
        flag: '🇰🇷',
        committee: 'Economic and Social Council',
        password: 'TESTING'
    },
    {
        id: '0009',
        firstname: 'Jacques',
        delegation: 'France',
        contactno: '252-627-2829',
        flag: '🇫🇷',
        committee: 'Security Council',
        password: 'TESTING'
    },
    {
        id: '0010',
        firstname: 'Aminata',
        delegation: 'Nigeria',
        contactno: '303-132-3334',
        flag: '🇳🇬',
        committee: 'General Assembly',
        password: 'TESTING'
    }
];

export default delegates;