/* eslint-disable react-hooks/immutability */
import React, { useRef, useMemo } from "react";
import { useFrame, createPortal, useLoader } from "@react-three/fiber";
import { useFBO } from "@react-three/drei";
import * as THREE from "three";
import { EXRLoader } from "three-stdlib";
import { FluidAdvectionShader } from "@/features/cauldron/lib/FluidAdvectionShader";

export function FluidFBOManager({
	children,
	densityPath,
	velocityPath,
	fps = 30,
}: {
	children: (texture: THREE.Texture) => React.ReactNode;
	densityPath: string;
	velocityPath: string;
	fps?: number;
}) {
	const densityMap = useLoader(EXRLoader, densityPath);
	const velocityMap = useLoader(EXRLoader, velocityPath);

	densityMap.wrapS = THREE.ClampToEdgeWrapping;
	densityMap.wrapT = THREE.ClampToEdgeWrapping;
	densityMap.minFilter = THREE.LinearFilter;
	densityMap.magFilter = THREE.LinearFilter;
	velocityMap.wrapS = THREE.ClampToEdgeWrapping;
	velocityMap.wrapT = THREE.ClampToEdgeWrapping;
	velocityMap.minFilter = THREE.LinearFilter;
	velocityMap.magFilter = THREE.LinearFilter;

	const fbo = useFBO(2048, 1024, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.LinearFilter,
		wrapS: THREE.ClampToEdgeWrapping,
		wrapT: THREE.ClampToEdgeWrapping,
		format: THREE.RGBAFormat,
		type: THREE.HalfFloatType,
		depthBuffer: false,
		stencilBuffer: false,
	});

	const offscreenScene = useMemo(() => new THREE.Scene(), []);
	const offscreenCamera = useMemo(() => new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), []);

	const advectionMaterial = useMemo(() => {
		const mat = new THREE.ShaderMaterial(FluidAdvectionShader); // FIX: Use Advection shader!
		mat.uniforms.uDensityMap.value = densityMap;
		mat.uniforms.uVelocityMap.value = velocityMap;
		mat.uniforms.uVelocityTexelSize = {
			value: new THREE.Vector2(1 / 1024, 1 / 512),
		};
		mat.uniforms.uDensityTexelSize = {
			value: new THREE.Vector2(1 / 2048, 1 / 1024),
		};
		return mat;
	}, [densityMap, velocityMap]);

	const timeRef = useRef(0);
	const TOTAL_FRAMES = 32.0;

	useFrame((state, delta) => {
		timeRef.current += delta * fps;
		const currentFrame = timeRef.current % TOTAL_FRAMES;

		const frameA = Math.floor(currentFrame);
		const frameB = (frameA + 1) % TOTAL_FRAMES;
		const progress = currentFrame - frameA;

		advectionMaterial.uniforms.uFrameA.value = frameA;
		advectionMaterial.uniforms.uFrameB.value = frameB;
		advectionMaterial.uniforms.uProgress.value = progress;

		state.gl.setRenderTarget(fbo);
		state.gl.render(offscreenScene, offscreenCamera);
		state.gl.setRenderTarget(null);
	});

	return (
		<>
			{createPortal(
				<mesh material={advectionMaterial}>
					<planeGeometry args={[2, 2]} />
				</mesh>,
				offscreenScene,
			)}

			{children(fbo.texture)}
		</>
	);
}
