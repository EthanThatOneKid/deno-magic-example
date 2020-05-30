import {
  MongoClient,
  config,
} from "../deps.ts";
import {
  User,
  userToQuery,
} from "./helpers.ts";

const client = new MongoClient();
const { MONGODB_URI, IS_DEV } = config();
client.connectWithUri(MONGODB_URI);

const isDev = IS_DEV === "1";
const db = client.database(isDev ? "dev" : "production");
const users = db.collection("users");

export const findUser = async (targetUser: User): Promise<User> => {
  return await users.findOne(userToQuery(targetUser));
};

export const addUser = async (user: User): Promise<User> => {
  try {
    await users.insertOne({ ...user });
  } catch (err) {
    console.log(err);
  }
  return { ...user };
};

export const updateUser = async (
  targetUser: User,
  updatedUser: User,
): Promise<User> => {
  try {
    await users.updateOne(
      userToQuery(targetUser),
      { $set: { ...updatedUser } },
    );
  } catch (err) {
    console.log(err);
  }
  return { ...targetUser, ...updatedUser };
};

export { User };
