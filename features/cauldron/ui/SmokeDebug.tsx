"use client";

import SmokeMaterial from "@/shared/materials/ui/SmokeMaterial";
import { useThree } from "@react-three/fiber";

export default function SmokeDebug() {
	const { viewport } = useThree();

	return (
		<mesh
			position={[viewport.width / 2 - 1.5, viewport.height / 2 - 1.5, 0]}
			scale={[2, 2, 1]}
		>
			<planeGeometry args={[1, 1]} />
			<SmokeMaterial />
		</mesh>
	);
}
