uniform vec3 uLightPos;
uniform vec3 uLightColor;
uniform float uShadowDensity;

float raymarchLightTransmittance(vec2 startUV, vec3 lightDirTS, float startHeight) {
	const int LIGHT_STEPS = 16;
	float stepSize = 1.0 / float(LIGHT_STEPS);

	// March in UV space along the light's tangent-space xy, gaining
	// "height" (moving up through density layers) as we go — mirrors
	// the POM loop but walking toward the light instead of the eye.
	vec2 uvStep = lightDirTS.xy * stepSize * uParallaxStrength;
	float heightStep = max(lightDirTS.z, 0.05) * stepSize;

	vec2 marchUV = startUV;
	float marchHeight = startHeight;
	float accumulatedDensity = 0.0;

	for (int i = 0; i < LIGHT_STEPS; i++) {
		marchUV += uvStep;
		marchHeight += heightStep;

		if (marchUV.x < 0.0 || marchUV.x > 1.0 || marchUV.y < 0.0 || marchUV.y > 1.0) {
			break;
		}

		float sampledDensity = sampleHeight(marchUV);

		// Only accumulate mass we're still "inside" — once marchHeight
		// climbs above the local density surface, the ray has exited
		// the fluid and there's nothing left to absorb light.
		if (marchHeight < sampledDensity) {
			accumulatedDensity += (sampledDensity - marchHeight) * stepSize;
		}
	}

	// Beer-Lambert: I = I0 * exp(-density * distance)
	return exp(-accumulatedDensity * uShadowDensity);
}
