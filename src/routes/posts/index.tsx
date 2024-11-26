import * as React from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/posts/")({
	component: RouteComponent,
});

function RouteComponent() {
	// console.log({ data });
	return (
		<div>
			<Outlet />
		</div>
	);
}
