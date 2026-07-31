"use client";

import { cn, Combobox, ComboboxTrigger } from "@/shared/shadcn";
import { AvailableTheme, AvailableThemesList } from "@/features/themes/lib/themes";
import { ThemeButtonContent } from "@/features/themes/ui/ThemeButtonContent";
import { Moon } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeButton = ({ className }: { className?: string }) => {
	// theme
	const { theme: _theme, setTheme } = useTheme();
	const theme = (_theme || "system") as AvailableTheme;

	// jsx
	return (
		<Combobox
			defaultValue="system"
			filter={null}
			items={AvailableThemesList}
			value={theme}
			onValueChange={(value) => {
				if (value) {
					setTheme(value);
				}
			}}
		>
			<ComboboxTrigger
				className={cn(
					"h-9 min-w-16 flex items-center justify-between gap-2 px-3 bg-secondary/15  hover:bg-muted/70 transition-all text-xs font-medium capitalize tracking-tight rounded-lg select-none",
					className ?? "",
				)}
			>
				<Moon />
			</ComboboxTrigger>

			<ThemeButtonContent theme={theme} />
		</Combobox>
	);
};
