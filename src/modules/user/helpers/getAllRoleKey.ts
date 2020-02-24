import { Role } from '../user.model';

const getAllRoleKey = (): any[] => {
  return Object.keys(Role);
};

export default getAllRoleKey;
