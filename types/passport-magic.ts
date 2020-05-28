import { Magic, Claim } from "./magic-admin-js.ts";

export interface StrategyOptionsWithReq {
  magicInstance?: Magic;
  passReqToCallback?: true;
  attachmentAttribute?: string;
}

export interface StrategyOptions {
  magicInstance?: Magic;
  passReqToCallback?: false;
  attachmentAttribute?: string;
}

export interface AuthenticateOptions {
  attachment?: string;
}

export interface MagicUser {
  issuer: string;
  publicAddress: string;
  claim: Claim;
  lastLoginAt?: number;
}

export interface MagicUserMetadata {
  email: string;
}

export interface DoneFuncInfo {
  message: string;
}

export interface DoneFunc {
  (error: any, user?: any, info?: DoneFuncInfo): void;
}

export interface VerifyFuncWithReq {
  (req: Request, user: MagicUser, done: DoneFunc): void;
}

export interface VerifyFunc {
  (user: MagicUser, done: DoneFunc): void;
}
