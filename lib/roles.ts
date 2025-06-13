import {UserType} from '@/db/types';


export default function role(user: UserType): string {

 return (user && 'chairID' in user) ? 'chair' :
  (user && 'delegateID' in user) ? 'delegate' : "admin";
}