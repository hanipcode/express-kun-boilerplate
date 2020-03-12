import { IUserAccess } from '../modules/user/user.model';

type UserAccessKey = keyof IUserAccess;

function checkAccess(
  access: IUserAccess,
  accessNeeded: UserAccessKey | UserAccessKey[]
) {
  if (Array.isArray(accessNeeded)) {
    const notHaveAccessTo = accessNeeded.filter(
      curAccess => !access[curAccess]
    );
    if (notHaveAccessTo.length > 0) {
      return false;
    }
    return true;
  }
  console.log(access, accessNeeded);
  return access[accessNeeded];
}

export default checkAccess;
