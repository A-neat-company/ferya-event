import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.server.RESEND_API_KEY);
