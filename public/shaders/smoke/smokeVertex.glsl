varying vec2 vUv;

varying vec3 vWorldPos;
varying vec3 vWorldNormal;
varying vec3 vViewDir;

void main() {
	vUv = uv;

	// World position of this vertex
	vec4 worldPos = modelMatrix * vec4(position, 1.0);
	vWorldPos = worldPos.xyz;

	// Transform normal into world space
	vWorldNormal = normalize(mat3(modelMatrix) * normal);

	// Direction from surface -> camera
	vViewDir = normalize(cameraPosition - worldPos.xyz);

	gl_Position = projectionMatrix * viewMatrix * worldPos;
}
