import * as React from "react";
import "@/index.css";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import type { QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		component: RootComponent,
	},
);

function RootComponent() {
	return (
		<React.Fragment>
			<Outlet />
			<TanStackRouterDevtools />
		</React.Fragment>
	);
}
