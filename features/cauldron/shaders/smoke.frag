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
uniform float fps;

#include "atlas.glsl";

void main() {
  float density = sampleDensityLoop(densityMap, vUv, tilesX, tilesY, frameCount, time, fps);
	gl_FragColor = renderDensity(density);
	// gl_FragColor = debugDensity(density);
}
