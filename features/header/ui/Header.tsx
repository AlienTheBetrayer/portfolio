"use client";

import { useHeader } from "@/features/header/hooks/useHeader";
import { ThemeButton } from "@/features/themes/ui/ThemeButton";
import { Button } from "@/shared/shadcn";
import { Boxes } from "lucide-react";
import { useRef } from "react";

export const Header = () => {
	const headerRef = useRef<HTMLDivElement | null>(null);
	useHeader(headerRef);

	// jsx
	return (
		<header
			className="flex items-center justify-center px-4 fixed left-0 right-0 -top-24 w-screen z-2"
			ref={headerRef}
		>
			<nav className="bg-background/10 backdrop-blur-xl w-full h-12 rounded-full max-w-104">
				<ul className="flex items-center w-full h-full px-4">
					<li>
						<Button
							className="aspect-square"
							variant="ghost"
						>
							<Boxes />
						</Button>
					</li>

					<li>
						<Button variant="ghost">
							<span className="text-xs">Section 1</span>
						</Button>
					</li>

					<li>
						<Button variant="ghost">
							<span className="text-xs">Section 1</span>
						</Button>
					</li>

					<li className="ml-auto">
						<ThemeButton />
					</li>
				</ul>
			</nav>
		</header>
	);
};
