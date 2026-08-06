varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewDir;

uniform sampler2D densityMap;
uniform float time;
uniform float tilesX;
uniform float tilesY;
uniform float frameCount;
uniform float frame;
uniform float heightScale;
uniform float layers;
uniform float fps;

#pragma include "geometry.glsl";
#pragma include "parallax.glsl";

void main() {
	// init
	float frame = getFrame(time, fps, frameCount);
	vec3 viewDir = getViewDir(vWorldPos);

	// parallax + sampling
	vec2 pomUV = applyPOM(densityMap, vUv, viewDir, heightScale, layers, frame, tilesX, tilesY);
	float density = sampleDensity(densityMap, pomUV, tilesX, tilesY, frame);

	// rendering / debugging
	gl_FragColor = renderDensity(density);
	// gl_FragColor = debugDensity(density);
}
