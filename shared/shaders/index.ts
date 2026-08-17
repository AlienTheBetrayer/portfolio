/**
 * registry
 */
import atlas from "./atlas.glsl";
import parallax from "./parallax.glsl";
import raymarch from "./raymarch.glsl";
import utils from "./utils.glsl";

export const shaderFiles: Record<string, string> = {
	"atlas.glsl": atlas,
	"parallax.glsl": parallax,
	"raymarch.glsl": raymarch,
	"utils.glsl": utils,
};
