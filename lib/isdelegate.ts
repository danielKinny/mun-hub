import { UserType, Delegate } from "@/db/types";

export default function isDelegate(user: UserType): user is Delegate {
  return !!user && ("delegateID" in user);
}