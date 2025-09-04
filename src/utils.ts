export function padZero(str: string): string {
	if (typeof str === "number") {
		str = (str as number).toString();
	}

	if (typeof str !== "string") {
		console.error(`expected type "string", got "${typeof str}"`);
		return "";
	}

	if (str.length !== 2) {
		return str.padStart(2, "0");
	}
	return str;
}
