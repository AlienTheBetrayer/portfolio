"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { Box3, Group, Mesh, PointLight, Vector3 } from "three";
import { useSmokeSimulation } from "../hooks/useSmokeSimulation";
import { EXRLoader } from "three-stdlib";
import { createSmokeMaterial } from "@/shared/materials/lib/createMaterial";

export const CauldronScene = () => {
	const groupRef = useRef<Group>(null);
	const lightRef = useRef<PointLight>(null);

	// 1. Load your exported Unreal GLB
	const { scene, nodes } = useGLTF("/models/cauldron.gltf");

	// 2. Run the simulation to get the animated RT_POM_source1 texture
	const densityTex = useLoader(EXRLoader, "/textures/DryIce2d_density.exr");
	const velocityTex = useLoader(EXRLoader, "/textures/DryIce2d_velocity.exr");
	const animatedTexture = useSmokeSimulation(densityTex, velocityTex);

	// 3. Generate the Raymarch Material using the animated texture
	const smokeMaterial = useMemo(() => {
		if (!animatedTexture) return null;
		return createSmokeMaterial(animatedTexture);
	}, [animatedTexture]);

	useEffect(() => {
		const box = new Box3().setFromObject(scene);
		const center = box.getCenter(new Vector3());

		scene.position.sub(center);
	}, [scene]);

	// 4. Inject the material into the specific GLB meshes before they render
	useLayoutEffect(() => {
		if (!smokeMaterial || !nodes) return;

		["BakedFluidsimData7", "BakedFluidsimData8", "BakedFluidsimData9"].forEach((name) => {
			const mesh = nodes[name] as Mesh;
			if (mesh) {
				mesh.material = smokeMaterial;
				mesh.renderOrder = 10; // Ensure transparent fluid renders over cauldron
			}
		});
	}, [nodes, smokeMaterial]);

	// 5. Animate the light and pass its position into the raymarch material
	useFrame(({ clock }) => {
		const time = clock.getElapsedTime();

		if (lightRef.current && smokeMaterial) {
			// Orbit the light around the cauldron (matches the Blueprint sine/cosine logic)
			const lightX = Math.sin(time) * 3;
			const lightZ = Math.cos(time) * 3;
			const lightY = 4 + Math.sin(time * 2) * 0.5; // slight bobbing

			lightRef.current.position.set(lightX, lightY, lightZ);

			// Pass the new light position to the raymarch shader for volumetric shadows
			smokeMaterial.uniforms.uLightPosition.value.copy(lightRef.current.position);
		}
	});

	return (
		<group
			ref={groupRef}
			dispose={null}
		>
			{/* Dynamic Point Light */}
			<pointLight
				ref={lightRef}
				color="#44ffaa"
				intensity={2.5}
				distance={10}
			/>

			{/* Render the original GLB scene */}
			{/* The smoke meshes inside will now render with your custom raymarch shader */}
			<primitive object={scene} />
		</group>
	);
};

// Preload the model for better performance
useGLTF.preload("/models/cauldron.glb");
