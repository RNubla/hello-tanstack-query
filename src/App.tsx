import { useState } from "react";
import "./App.css";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";

type Post = {
	id: number;
	title: string;
	body: string;
};
function usePosts() {
	return useQuery({
		queryKey: ["posts"],
		queryFn: async (): Promise<Array<Post>> => {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/posts",
			);
			return await response.json();
		},
	});
}

function Posts() {
	const { status, data, error, isFetching } = usePosts();
	console.log({ data });
	return (
		<div>
			Posts
			<div>
				{data?.map((post) => (
					<div key={post.id}>{post.title}</div>
				))}
			</div>
		</div>
	);
}
const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div>Hi</div>
			<Posts />
		</QueryClientProvider>
	);
}

export default App;
