/**
 * all available themes (categorized)
 */
export const AvailableThemesList = [
	{
		value: "Light",
		items: ["light"],
	},
	{
		value: "Dark",
		items: ["dark", "amoled"],
	},
	{
		value: "System",
		items: ["system", "high-contrast"],
	},
] as const;

export const AvailableThemes = AvailableThemesList.flatMap(({ items }) => items);
export const AvailableThemesGroups = AvailableThemesList.map(({ value }) => value);

/**
 * all available themes (literal)
 */
export type AvailableTheme = (typeof AvailableThemes)[number];

/**
 * all available groups
 */
export type AvailableGroup = (typeof AvailableThemesGroups)[number];
