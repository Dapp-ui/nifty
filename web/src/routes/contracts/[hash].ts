export async function get({ params: { hash } }: any) {
	return {
		body: { hash }
	};
}
