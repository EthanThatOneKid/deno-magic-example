import {
  MagicAdmin,
  config,
} from "../deps.ts";
import {
  Claim,
  MagicUserMetadata,
} from "../types/mod.ts";

interface MagicVerification {
  claim: Claim;
  metadata: MagicUserMetadata;
}

const { MAGIC_SECRET_KEY } = config();
const admin = new MagicAdmin(MAGIC_SECRET_KEY);

export const verifyDidToken = async (
  didToken: string | undefined,
): Promise<MagicVerification | null> => {
  if (didToken === undefined) {
    return null;
  }
  try {
    await admin.token.validate(didToken);
    const [proof, claim]: [string, Claim] = await admin.token.decode(didToken);
    const metadata = await admin.users.getMetadataByToken(didToken);
    return { claim, metadata };
  } catch ({ data }) {
    console.log(data);
    return null;
  }
};
