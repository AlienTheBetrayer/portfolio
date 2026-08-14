uniform sampler2D uDensityMap;
uniform sampler2D uVelocityMap;

uniform float uProgress;
uniform float uFrameA;
uniform float uFrameB;
uniform float uAdvectionStrength;

uniform vec2 uGridSize;
uniform vec2 uDensityTexelSize;
uniform vec2 uVelocityTexelSize;
varying vec2 vUv;

#pragma include "atlas.glsl";

void main() {
	// velocity
	vec2 velocityUvA = getVelocityUV(vUv, uFrameA);
	vec2 velocityUvB = getVelocityUV(vUv, uFrameB);

	vec2 velA = texture2D(uVelocityMap, velocityUvA).rg * 2.0 - 1.0;
	vec2 velB = texture2D(uVelocityMap, velocityUvB).rg * 2.0 - 1.0;

	// orientation
	velA.y *= -1.0;
	velB.y *= -1.0;

	// displacement
	vec2 localWarpA = velA * uProgress * uAdvectionStrength / uGridSize;
	vec2 localWarpB = velB * (1.0 - uProgress) * uAdvectionStrength / uGridSize;

  // warping
	vec2 distortedLocalUvA = clamp(vUv - localWarpA, 0.0, 1.0);
	vec2 distortedLocalUvB = clamp(vUv + localWarpB, 0.0, 1.0);

  // uv conversion
	vec2 distortedUvA = getDensityUV(distortedLocalUvA, uFrameA);
	vec2 distortedUvB = getDensityUV(distortedLocalUvB, uFrameB);

  // density
	float densityA = texture2D(uDensityMap, distortedUvA).r;
	float densityB = texture2D(uDensityMap, distortedUvB).r;

  // interpolation
	float finalDensity = mix(densityA, densityB, uProgress);

  // output
	gl_FragColor = vec4(finalDensity, finalDensity, finalDensity, 1.0);
}
