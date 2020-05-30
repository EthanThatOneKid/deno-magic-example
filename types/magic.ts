export interface Claim {
  iat: number; // Issued At Timestamp
  ext: number; // Expiration Timestamp
  iss: string; // Issuer of DID Token
  sub: string; // Subject
  aud: string; // Audience
  nbf: number; // Not Before Timestamp
  tid: string; // DID Token ID
  add: string; // Encrypted signature of arbitrary data
}

export type ParsedDIDToken = [string, Claim];

export type Magic = any;

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
  publicAddress: string;
  issuer: string;
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
