// user.model.ts
export interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  token: string;
}
