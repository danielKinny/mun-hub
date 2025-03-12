import {delegates} from "../db/index";

export const authenticate = (id: string, password: string) => {
  return delegates.find((delegate) => delegate.id === id && delegate.password === password);
}