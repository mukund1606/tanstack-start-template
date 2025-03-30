import * as React from "react";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import type { TRPCOptionsProxy } from "@trpc/tanstack-react-query";

import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { NotFound } from "~/components/not-found";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import appCss from "~/styles/app.css?url";
import type { AppRouter } from "~/trpc/router";
import { auth } from "~/utils/auth";
import { SEO } from "~/utils/seo";

const getServerSession = createServerFn({ method: "GET" }).handler(async () => {
  const { headers } = getWebRequest()!;
  const session = await auth.api.getSession({ headers });

  return session;
});

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<AppRouter>;
}>()({
  beforeLoad: async () => {
    const session = await getServerSession();

    return { session };
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      ...SEO({
        title: "Tanstack Start",
        description: `Tanstack Start`,
      }),
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      // {
      //   rel: 'apple-touch-icon',
      //   sizes: '180x180',
      //   href: '/apple-touch-icon.png',
      // },
      // {
      //   rel: 'icon',
      //   type: 'image/png',
      //   sizes: '32x32',
      //   href: '/favicon-32x32.png',
      // },
      // {
      //   rel: 'icon',
      //   type: 'image/png',
      //   sizes: '16x16',
      //   href: '/favicon-16x16.png',
      // },
      // { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      // { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors closeButton />
          <TanStackRouterDevtools position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
          <Scripts />
        </ThemeProvider>
      </body>
    </html>
  );
}
