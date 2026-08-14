uniform sampler2D uDensityMap;
uniform vec3 uLightPos;
uniform float uHeightScale;
uniform float uShadowSteps;
uniform float uShadowDensity;
uniform vec3 uFluidColor;
uniform vec3 uLightColor;

varying vec3 vWorldPosition;
varying vec3 vViewPosition;
varying vec2 vUv;

void main() {
	vec3 viewDir = normalize(vViewPosition);

	float numLayers = 16.0;
	float layerDepth = 1.0 / numLayers;
	float currentLayerDepth = 0.0;

	vec2 p = viewDir.xy * uHeightScale;
	vec2 deltaTexCoords = p / numLayers;

	vec2 currentTexCoords = vUv;
	float currentDepthMapValue = texture2D(uDensityMap, currentTexCoords).r;

	for (int i = 0; i < 16; i++) {
		if (currentLayerDepth >= currentDepthMapValue) break;
		currentTexCoords -= deltaTexCoords;
		currentDepthMapValue = texture2D(uDensityMap, currentTexCoords).r;
		currentLayerDepth += layerDepth;
	}

	vec2 offsetUv = currentTexCoords;
	float finalDensity = texture2D(uDensityMap, offsetUv).r;

	if (finalDensity < 0.01) discard;

	vec3 lightDir = normalize(uLightPos - vWorldPosition);

	float accumulatedDensity = 0.0;
	vec2 lightStep = lightDir.xy * (uHeightScale / uShadowSteps);
	vec2 shadowUv = offsetUv;

	for (float i = 0.0; i < 16.0; i += 1.0) {
		if (i >= uShadowSteps) break;

		float sampleDensity = texture2D(uDensityMap, shadowUv).r;
		accumulatedDensity += sampleDensity;

		shadowUv += lightStep;
	}

	float transmittance = exp(-accumulatedDensity * uShadowDensity);

	vec3 finalColor = uFluidColor * mix(vec3(0.1), uLightColor, transmittance);

	gl_FragColor = vec4(finalColor, finalDensity);
}
