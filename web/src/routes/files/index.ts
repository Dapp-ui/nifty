import type { RequestHandler, RequestHandlerOutput } from '@sveltejs/kit';
import type { CIDString } from 'nft.storage';

import storeFile from '../../utils/storeFile';

type Output = { cid: CIDString };
type Params = {};

export const post: RequestHandler<Params, Output> = async ({ request }) => {
	const blob = await request.blob();
	const cid = await storeFile(blob);

	return {
		body: {
			cid
		}
	};
};
