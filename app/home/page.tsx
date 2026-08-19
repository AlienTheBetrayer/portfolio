"use client";

import { SphereCanvas } from "@/features/sphere/ui/SphereCanvas";

export default function HomePage() {
	return (
		<div className="flex flex-col gap-2 w-screen rounded-4xl overflow-hidden border-card border">
			<div className="w-full max-w-500 mx-auto h-screen max-h-300 overflow-hidden">
				<SphereCanvas />
			</div>

			{/* <div className="w-full max-w-500 mx-auto h-screen max-h-300 overflow-hidden">
				<CauldronCanvas />
			</div> */}
		</div>
	);
}
