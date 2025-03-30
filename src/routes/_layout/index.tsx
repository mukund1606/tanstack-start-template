import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/")({
  component: RouteComponent,
});

async function RouteComponent() {
  return (
    <center>
      <h1 className="text-2xl font-extrabold">Welcome</h1>
    </center>
  );
}
