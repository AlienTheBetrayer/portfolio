"use client";

import {
	ComboboxCollection,
	ComboboxContent,
	ComboboxGroup,
	ComboboxItem,
	ComboboxLabel,
	ComboboxList,
	ComboboxSeparator,
} from "@/shared/shadcn";
import { getThemeIcon } from "@/features/themes/lib/getThemeIcon";
import { AvailableTheme, AvailableThemesList } from "@/features/themes/lib/themes";

export const ThemeButtonContent = ({ theme }: { theme: AvailableTheme }) => {
	return (
		<ComboboxContent
			align="center"
			className="w-48 p-1 bg-popover z-50 max-h-64"
		>
			<ComboboxList className="fade-bottom">
				{(group: (typeof AvailableThemesList)[number], index: number) => (
					<ComboboxGroup
						key={group.value}
						items={group.items}
					>
						<ComboboxLabel className="text-[10px] font-medium tracking-wider text-muted-foreground/50 uppercase px-2.5 py-1 select-none">
							{group.value}
						</ComboboxLabel>

						<ComboboxCollection>
							{(item: AvailableTheme) => {
								const isActive = theme === item;
								return (
									<ComboboxItem
										key={item}
										value={item}
										className={`flex items-center justify-between text-xs font-medium tracking-tight px-2.5 py-1.5 cursor-pointer rounded-md transition-colors capitalize data-[highlighted]:bg-muted data-[highlighted]:text-foreground ${
											isActive ? "bg-muted text-foreground font-semibold" : "text-muted-foreground/80"
										}`}
									>
										<div className="flex items-center gap-2">
											{getThemeIcon(item)}
											<span>{item.replace("-", " ")}</span>
										</div>
									</ComboboxItem>
								);
							}}
						</ComboboxCollection>
						{index < AvailableThemesList.length - 1 && <ComboboxSeparator className="my-1 border-t border-border/40" />}
					</ComboboxGroup>
				)}
			</ComboboxList>
		</ComboboxContent>
	);
};
