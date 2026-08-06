#pragma include "common.glsl";

vec3 getViewDir(vec3 worldPos) {
	return safeNormalize(cameraPosition - worldPos);
}
