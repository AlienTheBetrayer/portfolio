import { AvailableThemes } from "@/features/themes/lib/themes";
import { ThemeProvider } from "next-themes";

export const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider
			attribute="data-theme"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
			themes={[...AvailableThemes]}
		>
			{children}
		</ThemeProvider>
	);
};
