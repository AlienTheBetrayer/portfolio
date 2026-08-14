"use client";

import { CauldronScene } from "@/features/cauldron/ui/CauldronScene";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export const CauldronCanvas = () => {
	return (
		<Canvas camera={{ position: [0, 2.5, 3.5], fov: 45 }}>
			<OrbitControls />
			<CauldronScene />
		</Canvas>
	);
};
