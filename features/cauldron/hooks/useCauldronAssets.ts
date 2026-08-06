"use client";

import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { EXRLoader } from "three-stdlib";

export const useCauldronAssets = () => {
	const [density, velocity] = useLoader(EXRLoader, [
		"/textures/DryIce2d_density.exr",
		"/textures/DryIce2d_velocity.exr",
	]);

	return useMemo(
		() => ({
			density,
			velocity,
		}),
		[density, velocity],
	);
};
