export const environment = {
	production: true,
	mapboxAccessToken: "MAPBOX_ACCESS_TOKEN",
	backgroundEffects: {
		opacity: {
			min: 0.1, // 0 - 1, lt max
			max: 0.25, // 0 - 1, gt min
			transitionSpeed: 0.005, // 0 - 1, lt max - min
		},
		spacing: 30, // adjust spacing for better visibility
	},
};
