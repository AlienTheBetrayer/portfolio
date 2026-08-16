uniform sampler2D uDensityMap;

varying vec2 vUv;

void main() {
	float density = texture2D(
		uDensityMap,
		vUv
	).r;

	gl_FragColor = vec4(
		vec3(density),
		1.0
	);
}