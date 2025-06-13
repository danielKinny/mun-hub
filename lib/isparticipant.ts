import { UserType, Delegate, Chair } from "@/db/types";

export default function isDelegate(user: UserType): user is Delegate | Chair {
  return !!user && ("delegateID" in user || "chairID" in user);
}