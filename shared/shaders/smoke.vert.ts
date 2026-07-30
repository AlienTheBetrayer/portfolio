export const smokeVert = `
varying vec2 vUv;
varying vec3 vLocalViewDir;
varying vec3 vWorldPosition;
varying vec3 vNormal;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);

    // Compute view direction in local mesh space (immune to scene/camera position shifts)
    vec3 localCameraPos = (inverse(modelMatrix) * vec4(cameraPosition, 1.0)).xyz;
    vLocalViewDir = normalize(localCameraPos - position);

    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
