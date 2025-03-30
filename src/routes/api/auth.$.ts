import { createAPIFileRoute } from "@tanstack/react-start/api";

import { auth } from "~/utils/auth";

function handler({ request }: { request: Request }) {
  return auth.handler(request);
}

export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: handler,
  POST: handler,
});
