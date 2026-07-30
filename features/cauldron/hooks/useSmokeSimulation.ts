/* eslint-disable react-hooks/immutability */
import { simulationFrag } from "@/shared/shaders/simulation.frag";
import { simulationVert } from "@/shared/shaders/simulation.vert";
import { useFrame } from "@react-three/fiber";
import { useMemo, useEffect } from "react";
import {
	Texture,
	ShaderMaterial,
	Vector2,
	WebGLRenderTarget,
	Scene,
	OrthographicCamera,
	Mesh,
	PlaneGeometry,
	RGBAFormat,
	HalfFloatType,
	LinearFilter,
} from "three";

export function useSmokeSimulation(
	densityTex: Texture | null,
	velocityTex: Texture | null,
	width: number = 1024,
	height: number = 1024,
) {
	// 1. Create the Render Target (FBO) where the animated frame is written
	// target
	const renderTarget = useMemo(() => {
		return new WebGLRenderTarget(width, height, {
			format: RGBAFormat,
			type: HalfFloatType,
			minFilter: LinearFilter,
			magFilter: LinearFilter,
			depthBuffer: false,
			stencilBuffer: false,
		});
	}, [width, height]);

	// mateiral
	const simulationMaterial = useMemo(() => {
		return new ShaderMaterial({
			uniforms: {
				uDensityMap: { value: densityTex },
				uVelocityMap: { value: velocityTex },
				uTime: { value: 0 },
				uGridDimensions: { value: new Vector2(5, 5) },
				uSpeed: { value: 2.0 }, // Continuous frame rate
				uFlowStrength: { value: 0.015 }, // Keep this LOW! 0.01 to 0.02 Max
			},
			vertexShader: simulationVert,
			fragmentShader: simulationFrag,
		});
	}, [densityTex, velocityTex]);

	// update values
	useEffect(() => {
		if (densityTex) simulationMaterial.uniforms.uDensityMap.value = densityTex;
		if (velocityTex) simulationMaterial.uniforms.uVelocityMap.value = velocityTex;
	}, [densityTex, velocityTex, simulationMaterial]);

	const { offscreenScene, offscreenCamera } = useMemo(() => {
		const scene = new Scene();

		const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);

		const quad = new Mesh(new PlaneGeometry(2, 2), simulationMaterial);
		scene.add(quad);

		return { offscreenScene: scene, offscreenCamera: camera };
	}, [simulationMaterial]);

	// cleanup
	useEffect(() => {
		return () => {
			renderTarget.dispose();
			simulationMaterial.dispose();
		};
	}, [renderTarget, simulationMaterial]);

	// render
	useFrame((state, delta) => {
		if (!densityTex || !velocityTex) return;

		simulationMaterial.uniforms.uTime.value += delta;

		const currentRenderTarget = state.gl.getRenderTarget();

		state.gl.setRenderTarget(renderTarget);
		state.gl.clear();
		state.gl.render(offscreenScene, offscreenCamera);

		state.gl.setRenderTarget(currentRenderTarget);
	});

	return renderTarget.texture;
}
