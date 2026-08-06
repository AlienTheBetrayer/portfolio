attribute vec4 tangent;

varying vec3 vViewDir;
varying mat3 vTBN;
varying vec2 vUv;
varying vec3 vWorldPos;
varying vec3 vWorldNormal;

void main() {
	vUv = uv;

	vec4 worldPos = modelMatrix * vec4(position, 1.0);
	vWorldPos = worldPos.xyz;

	// World normal
	vec3 N = normalize(mat3(modelMatrix) * normal);

	// World tangent
	vec3 T = normalize(mat3(modelMatrix) * tangent.xyz);

	// World bitangent
	vec3 B = normalize(cross(N, T) * tangent.w);

	// Save everything
	vWorldNormal = N;
	vViewDir = normalize(cameraPosition - worldPos.xyz);

	// Tangent Basis Matrix
	vTBN = mat3(T, B, N);

	gl_Position = projectionMatrix * viewMatrix * worldPos;
}
