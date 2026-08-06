"use client";

import { useCauldronAssets } from "@/features/cauldron/hooks/useCauldronAssets";
import { smokeFragmentShader, smokeVertexShader } from "@/features/cauldron/shaders";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect, useRef } from "react";
import { ShaderMaterial, DoubleSide, Vector3, Mesh } from "three";

export const useCauldronModel = () => {
	const { scene } = useGLTF("/models/Usecases_Additional2.gltf");
	const { density } = useCauldronAssets();

	const smokeMaterial = useRef<ShaderMaterial | null>(null);

	// eslint-disable-next-line react-hooks/refs
	if (!smokeMaterial.current) {
		smokeMaterial.current = new ShaderMaterial({
			vertexShader: smokeVertexShader,
			fragmentShader: smokeFragmentShader,
			transparent: true,
			depthWrite: false, //
			depthTest: true, //
			side: DoubleSide,
			uniforms: {
				time: { value: 0 },
				frame: { value: 0 },
				heightScale: { value: 0.05 },
				layers: { value: 32 },
				densityMap: { value: density },
				tilesX: { value: 8 },
				tilesY: { value: 4 },
				frameCount: { value: 32 },
				fps: { value: 24 },
				lightPosition: { value: new Vector3() },
			},
		});
	}

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		if (!smokeMaterial.current) {
			return;
		}

		smokeMaterial.current.uniforms.time.value = time;
	});

	useEffect(() => {
		scene.traverse((child) => {
			if (!(child instanceof Mesh)) {
				return;
			}

			if (
				child.name.includes("BakedFluidsimData7") ||
				child.name.includes("BakedFluidsimData8") ||
				child.name.includes("BakedFluidsimData9")
			) {
				child.material = smokeMaterial.current;
			}
		});
	}, [scene, smokeMaterial]);

	return useMemo(
		() => ({
			scene,
		}),
		[scene],
	);
};
