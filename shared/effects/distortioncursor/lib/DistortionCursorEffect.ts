import { distortionFrag } from "@/shared/effects/distortioncursor/shaders/distortion.frag";
import { Effect } from "postprocessing";
import { Uniform, Vector2 } from "three";

export class DistortionCursorEffect extends Effect {
	constructor(strength?: number) {
		super("DistortionCursorEffect", distortionFrag, {
			uniforms: new Map<string, Uniform>([
				["uMouse", new Uniform(new Vector2(0.5, 0.5))],
				["uTime", new Uniform(0)],
				["uStrength", new Uniform(strength ?? 0.1)],
				["uResolution", new Uniform(new Vector2(1920, 1080))],
			]),
		});
	}
}
