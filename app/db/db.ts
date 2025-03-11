import { StringToBoolean } from "class-variance-authority/types";
export interface Delegate {
    id: string;
    firstname: string;
    lastname: string;
    delegation: string;
    committee: string;
    flag: string;
    password?: string;
}

export const delegates: Delegate[] = [
    { id: '0001', firstname: 'John', lastname: 'Doe', delegation: 'USA', committee: 'ECOSOC', flag: '🇺🇸', password: 'TESTING' },
    { id: '0002', firstname: 'Jane', lastname: 'Smith', delegation: 'USA', committee: 'UNODC', flag: '🇺🇸', password: 'TESTING' },
    { id: '0003', firstname: 'Jim', lastname: 'Brown', delegation: 'USA', committee: 'UNSC', flag: '🇺🇸', password: 'TESTING' },
    { id: '0004', firstname: 'Jake', lastname: 'White', delegation: 'USA', committee: 'UNHRC', flag: '🇺🇸', password: 'TESTING' },
    { id: '0005', firstname: 'Jill', lastname: 'Black', delegation: 'USA', committee: 'UNESCO', flag: '🇺🇸', password: 'TESTING' },
    { id: '0006', firstname: 'Li', lastname: 'Wang', delegation: 'China', committee: 'ECOSOC', flag: '🇨🇳', password: 'TESTING' },
    { id: '0007', firstname: 'Wei', lastname: 'Zhang', delegation: 'China', committee: 'UNODC', flag: '🇨🇳', password: 'TESTING' },
    { id: '0008', firstname: 'Chen', lastname: 'Liu', delegation: 'China', committee: 'UNSC', flag: '🇨🇳', password: 'TESTING' },
    { id: '0009', firstname: 'Hua', lastname: 'Yang', delegation: 'China', committee: 'UNHRC', flag: '🇨🇳', password: 'TESTING' },
    { id: '0010', firstname: 'Fang', lastname: 'Zhao', delegation: 'China', committee: 'UNESCO', flag: '🇨🇳', password: 'TESTING' },
    { id: '0011', firstname: 'Amit', lastname: 'Patel', delegation: 'India', committee: 'ECOSOC', flag: '🇮🇳', password: 'TESTING' },
    { id: '0012', firstname: 'Raj', lastname: 'Kumar', delegation: 'India', committee: 'UNODC', flag: '🇮🇳', password: 'TESTING' },
    { id: '0013', firstname: 'Priya', lastname: 'Sharma', delegation: 'India', committee: 'UNSC', flag: '🇮🇳', password: 'TESTING' },
    { id: '0014', firstname: 'Anil', lastname: 'Reddy', delegation: 'India', committee: 'UNHRC', flag: '🇮🇳', password: 'TESTING' },
    { id: '0015', firstname: 'Sunita', lastname: 'Singh', delegation: 'India', committee: 'UNESCO', flag: '🇮🇳', password: 'TESTING' },
    { id: '0016', firstname: 'Olga', lastname: 'Ivanova', delegation: 'Russia', committee: 'ECOSOC', flag: '🇷🇺', password: 'TESTING' },
    { id: '0017', firstname: 'Dmitry', lastname: 'Petrov', delegation: 'Russia', committee: 'UNODC', flag: '🇷🇺', password: 'TESTING' },
    { id: '0018', firstname: 'Anna', lastname: 'Sokolova', delegation: 'Russia', committee: 'UNSC', flag: '🇷🇺', password: 'TESTING' },
    { id: '0019', firstname: 'Ivan', lastname: 'Smirnov', delegation: 'Russia', committee: 'UNHRC', flag: '🇷🇺', password: 'TESTING' },
    { id: '0020', firstname: 'Nina', lastname: 'Volkova', delegation: 'Russia', committee: 'UNESCO', flag: '🇷🇺', password: 'TESTING' },
    { id: '0021', firstname: 'Carlos', lastname: 'Garcia', delegation: 'Mexico', committee: 'ECOSOC', flag: '🇲🇽', password: 'TESTING' },
    { id: '0022', firstname: 'Maria', lastname: 'Lopez', delegation: 'Mexico', committee: 'UNODC', flag: '🇲🇽', password: 'TESTING' },
    { id: '0023', firstname: 'Jose', lastname: 'Martinez', delegation: 'Mexico', committee: 'UNSC', flag: '🇲🇽', password: 'TESTING' },
    { id: '0024', firstname: 'Luis', lastname: 'Hernandez', delegation: 'Mexico', committee: 'UNHRC', flag: '🇲🇽', password: 'TESTING' },
    { id: '0025', firstname: 'Ana', lastname: 'Gonzalez', delegation: 'Mexico', committee: 'UNESCO', flag: '🇲🇽', password: 'TESTING' },
    { id: '0026', firstname: 'Ahmed', lastname: 'Hassan', delegation: 'Egypt', committee: 'ECOSOC', flag: '🇪🇬', password: 'TESTING' },
    { id: '0027', firstname: 'Fatima', lastname: 'Ali', delegation: 'Egypt', committee: 'UNODC', flag: '🇪🇬', password: 'TESTING' },
    { id: '0028', firstname: 'Omar', lastname: 'Youssef', delegation: 'Egypt', committee: 'UNSC', flag: '🇪🇬', password: 'TESTING' },
    { id: '0029', firstname: 'Layla', lastname: 'Mahmoud', delegation: 'Egypt', committee: 'UNHRC', flag: '🇪🇬', password: 'TESTING' },
    { id: '0030', firstname: 'Hassan', lastname: 'Ibrahim', delegation: 'Egypt', committee: 'UNESCO', flag: '🇪🇬', password: 'TESTING' },
    { id: '0031', firstname: 'Yuki', lastname: 'Tanaka', delegation: 'Japan', committee: 'ECOSOC', flag: '🇯🇵', password: 'TESTING' },
    { id: '0032', firstname: 'Hiroshi', lastname: 'Yamamoto', delegation: 'Japan', committee: 'UNODC', flag: '🇯🇵', password: 'TESTING' },
    { id: '0033', firstname: 'Akira', lastname: 'Kobayashi', delegation: 'Japan', committee: 'UNSC', flag: '🇯🇵', password: 'TESTING' },
    { id: '0034', firstname: 'Naoko', lastname: 'Sato', delegation: 'Japan', committee: 'UNHRC', flag: '🇯🇵', password: 'TESTING' },
    { id: '0035', firstname: 'Kenji', lastname: 'Nakamura', delegation: 'Japan', committee: 'UNESCO', flag: '🇯🇵', password: 'TESTING' },
    { id: '0036', firstname: 'Hans', lastname: 'Müller', delegation: 'Germany', committee: 'ECOSOC', flag: '🇩🇪', password: 'TESTING' },
    { id: '0037', firstname: 'Anna', lastname: 'Schmidt', delegation: 'Germany', committee: 'UNODC', flag: '🇩🇪', password: 'TESTING' },
    { id: '0038', firstname: 'Peter', lastname: 'Weber', delegation: 'Germany', committee: 'UNSC', flag: '🇩🇪', password: 'TESTING' },
    { id: '0039', firstname: 'Laura', lastname: 'Fischer', delegation: 'Germany', committee: 'UNHRC', flag: '🇩🇪', password: 'TESTING' },
    { id: '0040', firstname: 'Michael', lastname: 'Becker', delegation: 'Germany', committee: 'UNESCO', flag: '🇩🇪', password: 'TESTING' },
    { id: '0041', firstname: 'Pierre', lastname: 'Dubois', delegation: 'France', committee: 'ECOSOC', flag: '🇫🇷', password: 'TESTING' },
    { id: '0042', firstname: 'Marie', lastname: 'Lefevre', delegation: 'France', committee: 'UNODC', flag: '🇫🇷', password: 'TESTING' },
    { id: '0043', firstname: 'Jean', lastname: 'Martin', delegation: 'France', committee: 'UNSC', flag: '🇫🇷', password: 'TESTING' },
    { id: '0044', firstname: 'Sophie', lastname: 'Bernard', delegation: 'France', committee: 'UNHRC', flag: '🇫🇷', password: 'TESTING' },
    { id: '0045', firstname: 'Luc', lastname: 'Roux', delegation: 'France', committee: 'UNESCO', flag: '🇫🇷', password: 'TESTING' },
    { id: '0046', firstname: 'Luca', lastname: 'Rossi', delegation: 'Italy', committee: 'ECOSOC', flag: '🇮🇹', password: 'TESTING' },
    { id: '0047', firstname: 'Giulia', lastname: 'Bianchi', delegation: 'Italy', committee: 'UNODC', flag: '🇮🇹', password: 'TESTING' },
    { id: '0048', firstname: 'Marco', lastname: 'Romano', delegation: 'Italy', committee: 'UNSC', flag: '🇮🇹', password: 'TESTING' },
    { id: '0049', firstname: 'Francesca', lastname: 'Ricci', delegation: 'Italy', committee: 'UNHRC', flag: '🇮🇹', password: 'TESTING' },
    { id: '0050', firstname: 'Alessandro', lastname: 'Conti', delegation: 'Italy', committee: 'UNESCO', flag: '🇮🇹', password: 'TESTING' }
];
export interface Committee {
    id: string;
    name: string;
    description: string;
    delegates: Delegate[];
}

    
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

