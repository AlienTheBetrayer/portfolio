import { AvailableTheme } from "@/features/themes/lib/themes";
import { Monitor, Moon, Sun, Terminal } from "lucide-react";
import { ComponentPropsWithRef } from "react";

/**
 * gets the icon of the theme based on its name
 * @param name name of the theme
 * @returns icon
 */
export const getThemeIcon = (name: AvailableTheme, props?: ComponentPropsWithRef<"svg">) => {
	switch (true) {
		case name.includes("light"): {
			return (
				<Sun
					className="size-3.5 text-muted-foreground"
					{...props}
				/>
			);
		}
		case name.includes("system"): {
			return (
				<Monitor
					className="size-3.5 text-muted-foreground"
					{...props}
				/>
			);
		}
		case name.includes("amoled") || name.includes("contrast"): {
			return (
				<Terminal
					className="size-3.5 text-muted-foreground"
					{...props}
				/>
			);
		}
		case name.includes("dark"): {
			return (
				<Moon
					className="size-3.5 text-muted-foreground"
					{...props}
				/>
			);
		}
		default: {
			return (
				<Moon
					className="size-3.5 text-muted-foreground"
					{...props}
				/>
			);
		}
	}
};
