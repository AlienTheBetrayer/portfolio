/**
 * registry
 */
import atlas from "./atlas.glsl";
import beerlaw from "./beerlaw.glsl";
import common from "./common.glsl";
import geometry from "./geometry.glsl";
import intersection from "./intersection.glsl";
import lighting from "./lighting.glsl";
import parallax from "./parallax.glsl";
import raymarch from "./raymarch.glsl";

export const shaderFiles: Record<string, string> = {
	"atlas.glsl": atlas,
	"beerlaw.glsl": beerlaw,
	"common.glsl": common,
	"geometry.glsl": geometry,
	"intersection.glsl": intersection,
	"lighting.glsl": lighting,
	"parallax.glsl": parallax,
	"raymarch.glsl": raymarch,
};
