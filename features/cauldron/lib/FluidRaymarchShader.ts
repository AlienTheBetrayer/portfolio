import { fluidFragmentShader, fluidVertexShader } from "@/features/cauldron/shaders";
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three";

export const FluidRaymarchShader = () =>
	new ShaderMaterial({
		uniforms: {
			uLightPos: { value: new Vector3(0, 2, 0) },
			uHeightScale: { value: 0.1 },
			uShadowSteps: { value: 16.0 },
			uShadowDensity: { value: 1.5 },
			uFluidColor: { value: new Color("#d4f1f9") },
			uLightColor: { value: new Color("#ffaa44") },
			uPomMinLayers: { value: 32.0 },
      uPomMaxLayers: { value: 192.0 },
      uDensityMap: { value: null },
      uParallaxStrength: { value: 0.4 }
		},
		vertexShader: fluidVertexShader,
		fragmentShader: fluidFragmentShader,
		transparent: true,
		depthWrite: false,
		side: DoubleSide,
	});
