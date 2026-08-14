/* eslint-disable react-hooks/immutability */
import { FluidRaymarchShader } from "@/features/cauldron/lib/FluidShader";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RefObject, useEffect, useMemo } from "react";
import { DoubleSide, Mesh, ShaderMaterial, Texture, DirectionalLight } from "three";

export const FluidRaymarchPlanes = ({
	gltfPath = "/models/fluids.gltf",
	fboTexture,
	lightRef,
	heightScale = 0.08,
	shadowDensity = 1.5,
	fluidColor = "#d4f1f9",
	lightColor = "#ffaa44",
}: {
	gltfPath?: string;
	fboTexture?: Texture;
	lightRef?: RefObject<DirectionalLight>;
	heightScale?: number;
	shadowDensity?: number;
	fluidColor?: string;
	lightColor?: string;
}) => {
	const { scene } = useGLTF(gltfPath);

	const shaderMaterial = useMemo(() => {
		return new ShaderMaterial({
			...FluidRaymarchShader, // FIX: Use Raymarch Shader!
			transparent: true,
			depthWrite: false,
			side: DoubleSide,
		});
	}, []);

	useEffect(() => {
		scene.traverse((child) => {
			if (child instanceof Mesh) {
				child.material = shaderMaterial;
			}
		});
	}, [scene, shaderMaterial]);

	useFrame(() => {
		if (!shaderMaterial) return;

		const uniforms = shaderMaterial.uniforms;

		if (fboTexture) {
			uniforms.uDensityMap.value = fboTexture;
		}

		uniforms.uHeightScale.value = heightScale;
		uniforms.uShadowDensity.value = shadowDensity;
		uniforms.uFluidColor.value.set(fluidColor);
		uniforms.uLightColor.value.set(lightColor);

		if (lightRef?.current) {
			uniforms.uLightPos.value.copy(lightRef.current.position);
		}
	});

	return <primitive object={scene} />;
};
