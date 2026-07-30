import { smokeFrag } from "@/shared/shaders/smoke.frag";
import { smokeVert } from "@/shared/shaders/smoke.vert";
import { ShaderMaterial, Vector3, Color, Texture, DoubleSide } from "three";

export const createSmokeMaterial = (animatedTexture: Texture) => {
	return new ShaderMaterial({
		uniforms: {
			uRenderTarget: { value: animatedTexture },
			uLightPosition: { value: new Vector3(0, 5, 0) }, // Dynamic point light pos
			uSmokeColor: { value: new Color("#44ffaa") }, // Cauldron glow color
			uBaseColor: { value: new Color("#081510") }, // Shadow/ambient color
			uHeightScale: { value: 0.12 }, // Parallax depth thickness
			uLightAbsorption: { value: 3.5 }, // Shadow density
			uStepCount: { value: 16 }, // Raymarch primary steps
			uShadowSteps: { value: 8 }, // Light raymarch steps
		},
		vertexShader: smokeVert,
		fragmentShader: smokeFrag,
		transparent: true,
		depthWrite: false,
		side: DoubleSide,
	});
};
