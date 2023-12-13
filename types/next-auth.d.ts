import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      username: string;
      gender: null | string;
      dob: null | string;
      created_at: string;
      updated_at: string;
      profile_image: string;
      need_create_password: boolean;
      roles: {
        uuid: string;
        name: string;
      }[];
    } & DefaultSession["user"];
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      username: string;
      gender: null | string;
      dob: null | string;
      created_at: string;
      updated_at: string;
      profile_image: string;
      need_create_password: boolean;
      roles: {
        uuid: string;
        name: string;
      }[];
    } & DefaultSession["user"];
    token: string;
  }
}
