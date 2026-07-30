"use client";

import { useLoader } from "@react-three/fiber";

import { useSmokeSimulation } from "@/features/cauldron/hooks/useSmokeSimulation";
import { EXRLoader } from "three-stdlib";

export default function SmokeMaterial() {
	const densityTex = useLoader(EXRLoader, "/textures/RadiSw7_density.exr");
	const velocityTex = useLoader(EXRLoader, "/textures/RadiSw7_velocity.exr");
	const animatedTexture = useSmokeSimulation(densityTex, velocityTex);

	return (
		<meshBasicMaterial
			map={animatedTexture}
			toneMapped={false}
		/>
	);
}
