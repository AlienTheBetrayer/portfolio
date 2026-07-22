import { HeaderItems } from "@/features/header/lib/items";
import { Button } from "@/features/shadcn";
import { ThemeButton } from "@/features/themes/ui/ThemeButton";
import Link from "next/link";

export const Header = () => {
	// jsx
	return (
		<header className="flex items-center px-4 sticky top-0 left-0 right-0 w-screen mx-auto h-16  backdrop-blur-md">
			<div className="flex items-center justify-between w-full max-w-400 mx-auto">
				<ul className="flex items-center justify-center">
					{HeaderItems.map((item) => (
						<li key={item}>
							<Button
								variant="ghost"
								className="px-2.5"
								render={
									<Link href={`/#${item.toLowerCase().replace(" ", "-")}`}>
										<span>{item}</span>
									</Link>
								}
								nativeButton={false}
							/>
						</li>
					))}
				</ul>
				<ThemeButton />
			</div>
		</header>
	);
};
