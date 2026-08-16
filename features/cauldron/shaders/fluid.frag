uniform sampler2D uDensityMap;
uniform float uHeightScale;
uniform float uPomMinLayers;
uniform float uPomMaxLayers;
uniform vec3 uFluidColor;
varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vWorldNormal;
varying vec3 vWorldTangent;

#pragma include "parallax.glsl";

void main() {
	vec3 worldViewDir = normalize(cameraPosition - vWorldPosition);

	vec3 N = normalize(vWorldNormal);
	vec3 T = normalize(vWorldTangent);
	vec3 B = normalize(cross(N, T));

	vec3 viewDirTS = normalize(vec3(dot(worldViewDir, T), dot(worldViewDir, B), dot(worldViewDir, N)));
	float intersectionHeight;
	vec2 displacedUV = POM(vUv, viewDirTS, intersectionHeight, uHeightScale, uPomMinLayers, uPomMaxLayers);

	float density = sampleHeight(displacedUV);

	if (density < 0.01) {
		discard;
	}

	vec3 finalColor = uFluidColor * (0.25 + density * 0.75);
	gl_FragColor = vec4(finalColor, density);
}
