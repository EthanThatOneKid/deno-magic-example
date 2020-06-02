import { Context } from "../deps.ts";

interface ErrorMessage {
  error: {
    message: string;
  };
}

const createErrorMessage = (message: string): ErrorMessage => ({
  error: { message },
});

export const errors = {
  magicVerification(ctx: Context) {
    ctx.response.status = 406; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/406
    ctx.cookies.delete("jwt");
    ctx.response.body = createErrorMessage(
      "There was a problem with Magic verification.",
    );
  },
  relayAttack(ctx: Context, issuer: string) {
    ctx.response.status = 409; // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409
    ctx.cookies.delete("jwt");
    ctx.response.body = createErrorMessage(
      `Replay attack detected for user ${issuer}.`,
    );
  },
};
