import { fluidFragmentShader, fluidVertexShader } from "@/features/cauldron/shaders";
import { Color, DoubleSide, ShaderMaterial, Vector3 } from "three";

export const FluidRaymarchShader = () =>
	new ShaderMaterial({
		uniforms: {
			uLightPos: { value: new Vector3(0, 2, 0) },
			uHeightScale: { value: 0.1 },
			uShadowSteps: { value: 160.0 },
			uShadowDensity: { value: 12.5 },
			uFluidColor: { value: new Color("#0000ff") },
			uLightColor: { value: new Color("#0000ff") },
			uPomMinLayers: { value: 32.0 },
      uPomMaxLayers: { value: 196.0 },
      uDensityMap: { value: null },
      uParallaxStrength: { value: 0.5 }
		},
		vertexShader: fluidVertexShader,
		fragmentShader: fluidFragmentShader,
		transparent: true,
		depthWrite: false,
		side: DoubleSide,
	});
