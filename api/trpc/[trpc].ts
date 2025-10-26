import { createNextApiHandler } from "@trpc/server/adapters/next";
import { appRouter } from "../../server/routers";
import { createContext } from "../../server/_core/context";

export default function handler(req: any, res: any) {
  return createNextApiHandler({
    router: appRouter,
    createContext,
    onError({ error }) {
      // keep simple logging for serverless
      // Vercel will capture the error in logs
      console.error("tRPC error:", error.message);
    },
  })(req, res);
}


