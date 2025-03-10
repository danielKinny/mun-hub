import {delegates} from "../db/db";

export const authenticate = (id: string, password: string) => {
  return delegates.find((delegate) => delegate.id === id && delegate.password === password);
}