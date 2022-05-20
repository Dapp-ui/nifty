type Attribute = {
	name: string;
	value: string | number;
};

const compileMeta = (name: string, description: string, image: string, attributes: Attribute[]) => {
	const obj = {
		name,
		description,
		image,
		attributes: attributes.map(({ name, value }) => ({ trait_type: name, value }))
	};

	const str = JSON.stringify(obj);

	console.log('THE FINAL META', str);

	var blob = new Blob([str], { type: 'application/json' });

	return blob;
};

export default compileMeta;
