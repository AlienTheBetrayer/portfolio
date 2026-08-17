/* eslint-disable react-hooks/immutability */
"use client";

import { FluidRaymarchShader } from "@/features/cauldron/lib/FluidRaymarchShader";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useMemo } from "react";
import { Mesh, DirectionalLight, Texture, TextureEventMap } from "three";

export const useCauldronModel = ({
	texture,
	lightRef,
	fluidColor = "#d4f1f9",
	lightColor = "#0000ff",
}: {
	texture: Texture<unknown, TextureEventMap>;
	lightRef?: RefObject<DirectionalLight | null>;
	heightScale?: number;
	shadowDensity?: number;
	fluidColor?: string;
	lightColor?: string;
}) => {
	// scene
	const { scene } = useGLTF("/models/cauldron.gltf");

	// material
	const raymarchMaterial = useMemo(() => FluidRaymarchShader(), []);

	// applying materials
	useEffect(() => {
		scene.traverse((child) => {
			if (!(child instanceof Mesh)) {
				return;
			}

			if (!child.name.includes("BakedFluid")) {
				// DEBUG: (Hide cauldron)
				child.scale.set(0, 0, 0);
				return;
			}

			child.material = raymarchMaterial;
		});
	}, [scene, raymarchMaterial]);

	// dynamic uniforms
  useFrame((state) => {
    // init
    const elapsedTime = state.clock.getElapsedTime();

		// unfiforms
		const uniforms = raymarchMaterial.uniforms;

		uniforms.uDensityMap.value = texture;
		uniforms.uFluidColor.value.set(fluidColor);
		uniforms.uLightColor.value.set(lightColor);

		// lighting
		if (!lightRef?.current) {
			return;
		}

    lightRef.current.position.set(Math.sin(elapsedTime) * 50, 2, Math.cos(elapsedTime) * 50);
		uniforms.uLightPos.value.copy(lightRef.current.position);
	});

	return useMemo(() => ({ scene }), [scene]);
};
