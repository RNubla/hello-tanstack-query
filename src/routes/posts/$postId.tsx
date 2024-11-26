import * as React from "react";
import {
	createFileRoute,
	ErrorComponent,
	type ErrorComponentProps,
	useRouter,
} from "@tanstack/react-router";
import {
	queryOptions,
	useQuery,
	useQueryErrorResetBoundary,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { PostNotFoundError } from "../../posts";
type Post = {
	id: number;
	title: string;
	body: string;
};
async function fetchPost(postId: string) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`,
	);
	return await response.json();
}
function postQueryOptions(postId: string) {
	return queryOptions({
		queryKey: ["posts", { postId }],
		queryFn: () => fetchPost(postId),
	});
}

export const Route = createFileRoute("/posts/$postId")({
	loader: ({ context: { queryClient }, params: { postId } }) => {
		return queryClient.ensureQueryData(postQueryOptions(postId));
	},
	errorComponent: PostErrorComponent,
	component: PostComponent,
});

function PostErrorComponent({ error }: ErrorComponentProps) {
	const router = useRouter();
	if (error instanceof PostNotFoundError) {
		return <div>{error.message}</div>;
	}
	const queryErrorResetBoundary = useQueryErrorResetBoundary();

	React.useEffect(() => {
		queryErrorResetBoundary.reset();
	}, [queryErrorResetBoundary]);

	return (
		<div>
			<button
				onClick={() => {
					router.invalidate();
				}}
			>
				retry
			</button>
			<ErrorComponent error={error} />
		</div>
	);
}

function PostComponent() {
	const postId = Route.useParams().postId;
	const { data: post } = useSuspenseQuery(postQueryOptions(postId));

	return (
		<div className="space-y-2">
			<h4 className="text-xl font-bold underline">{post.title}</h4>
			<div className="text-sm">{post.body}</div>
		</div>
	);
}
