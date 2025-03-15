import data from './data.json';
import { Database, Delegate, Country, Committee, Speech, Announcement } from './types';

const database = data as Database;

export const delegates: Delegate[] = database.delegates;
export const countries: Country[] = database.countries;
export const committees: Committee[] = database.committees;
export const speeches: Speech[] = database.speeches;
export const announcements :Announcement[] = database.announcements;
export default database;