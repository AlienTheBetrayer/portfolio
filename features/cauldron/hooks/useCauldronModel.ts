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
	heightScale = 0.08,
	shadowDensity = 1.5,
	fluidColor = "#d4f1f9",
	lightColor = "#ffaa44",
}: {
	texture: Texture<unknown, TextureEventMap>;
	lightRef?: RefObject<DirectionalLight>;
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
			}

			child.material = raymarchMaterial;
		});
	}, [scene, raymarchMaterial]);

	// dynamic uniforms
	useFrame(() => {
		const uniforms = raymarchMaterial.uniforms;

		uniforms.uDensityMap.value = texture;
		uniforms.uHeightScale.value = heightScale;
		uniforms.uShadowDensity.value = shadowDensity;
		uniforms.uFluidColor.value.set(fluidColor);
		uniforms.uLightColor.value.set(lightColor);

		if (lightRef?.current) {
			uniforms.uLightPos.value.copy(lightRef.current.position);
		}
	});

	return useMemo(() => ({ scene }), [scene]);
};
