export interface User {
  issuer?: string;
  email?: string;
  lastLoginAt?: number;
  id?: string;
}

export interface MongoQuery {
  [k: string]: {
    $eq: string;
  };
}

export const userToQuery = (user: User): MongoQuery => {
  const entries = Object.entries(user);
  const query = entries.reduce((result: MongoQuery, [property, value]) => {
    result[property] = { $eq: value };
    return result;
  }, {});
  return query;
};
