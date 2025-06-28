import { useMemo } from 'react';
import { useSession } from '../app/context/sessionContext';
import { UserType, Delegate, Chair } from '@/db/types';
import role from '@/lib/roles';

type DelegateUser = UserType & Delegate;
type ChairUser = UserType & Chair;

export const useUserRole = () => {
  const { user: currentUser } = useSession();
  const userRole = role(currentUser);

  return useMemo(() => {
    const isDelegateUser = userRole === "delegate" && currentUser !== null;
    const isChairUser = userRole === "chair" && currentUser !== null;
    const isParticipant = isDelegateUser || isChairUser;

    const getUserID = () => {
      if (isDelegateUser && currentUser) {
        return (currentUser as DelegateUser).delegateID;
      }
      if (isChairUser && currentUser) {
        return (currentUser as ChairUser).chairID;
      }
      return "";
    };

    const getUserName = () => {
      if (isDelegateUser && currentUser) {
        return (currentUser as DelegateUser).firstname;
      }
      if (isChairUser && currentUser) {
        return (currentUser as ChairUser).firstname;
      }
      return "";
    };

    const getCommitteeID = () => {
      if (isDelegateUser && currentUser && (currentUser as DelegateUser).committee) {
        return (currentUser as DelegateUser).committee.committeeID;
      }
      if (isChairUser && currentUser && (currentUser as ChairUser).committee) {
        return (currentUser as ChairUser).committee.committeeID;
      }
      return null;
    };

    const getApiEndpoint = () => {
      return isDelegateUser ? "/api/speeches/delegate" : "/api/speeches/chair";
    };

    const getApiParams = () => {
      const idKey = isDelegateUser ? "delegateID" : "chairID";
      const idValue = getUserID();
      return { idKey, idValue };
    };

    return {
      currentUser,
      userRole,
      isDelegateUser,
      isChairUser,
      isParticipant,
      getUserID,
      getUserName,
      getCommitteeID,
      getApiEndpoint,
      getApiParams,
      delegateUser: isDelegateUser ? (currentUser as DelegateUser) : null,
      chairUser: isChairUser ? (currentUser as ChairUser) : null,
    };
  }, [currentUser, userRole]);
};
