export function getTorontoOpenDataUrl(path?: string): string {
	let url = "https://ckan0.cf.opendata.inter.prod-toronto.ca";

	if (path) url += path;

	return url;
}

export function getTorontoPackageByIdUrl(packageId: string) {
	return getTorontoOpenDataUrl(`/api/3/action/package_show?id=${packageId}`);
}

export function getTorontoDataStoreByResourceIdUrl(
	resourceId: string,
	offset?: number,
) {
	let url = getTorontoOpenDataUrl(
		`/api/3/action/datastore_search?id=${resourceId}`,
	);

	if (offset) url += `&offset=${offset}`;

	return url;
}
