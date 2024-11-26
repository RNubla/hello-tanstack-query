import * as React from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
type Post = {
	id: string;
	title: string;
	body: string;
};
export const Route = createFileRoute("/posts")({
	component: RouteComponent,
});

async function fetchPosts() {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	return await response.json();
}
function usePosts() {
	return useQuery<Post[]>({
		queryKey: ["posts"],
		queryFn: fetchPosts,
	});
}

function RouteComponent() {
	const { status, data, error, isFetching } = usePosts();

	return (
		<div
			style={{
				display: "flex",
			}}
		>
			Posts
			<ul style={{ flexBasis: 1 }}>
				{data?.map((post) => (
					<li key={post.id}>
						<Link
							to="/posts/$postId"
							params={{ postId: post.id }}
							key={post.id}
						>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
			<div style={{}}>
				<Outlet />
			</div>
		</div>
	);
}
