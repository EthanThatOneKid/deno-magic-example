export interface Passport {
  use: (strategy: any) => void;
  authenticate: (name: string) => any;
}
