import { SquareClient, SquareEnvironment } from "square";
import { env } from "@/lib/env";

let _client: SquareClient | null = null;

export function getSquareClient(): SquareClient {
  if (!_client) {
    _client = new SquareClient({
      token: env.server.SQUARE_ACCESS_TOKEN,
      environment:
        env.server.SQUARE_ENVIRONMENT === "production"
          ? SquareEnvironment.Production
          : SquareEnvironment.Sandbox,
    });
  }
  return _client;
}
