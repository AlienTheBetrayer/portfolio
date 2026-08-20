import { creviceVertexShader, creviceFragmentShader } from "@/features/sphere/shaders";
import { Color, ShaderMaterial } from "three";

export const CreviceGlowMaterial = () =>
	new ShaderMaterial({
		uniforms: {
			uGlowColor: { value: new Color("#5440c9") },
      uBaseColor: { value: new Color("#050508") },
			uHoveredInstance: { value: -1 },
		},
		vertexShader: creviceVertexShader,
		fragmentShader: creviceFragmentShader,
	});
