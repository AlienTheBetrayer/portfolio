export const cauldronFragmentShader = `
    uniform float uTime;
uniform vec3 uLightPos1;
uniform vec3 uLightColor1;
uniform vec3 uLightPos2;
uniform vec3 uLightColor2;
uniform sampler2D uDensityMap;
uniform sampler2D uFlowMap;
uniform float uParallaxHeight;
uniform float uFlowSpeed;

// Flipbook atlas config
uniform float uTilesX;     // columns in the atlas, e.g. 8.0
uniform float uTilesY;     // rows in the atlas, e.g. 8.0
uniform float uFrameCount; // total baked frames, e.g. 64.0
uniform float uFPS;        // playback speed of the bake

varying vec2 vUv;
varying vec3 vWorldPosition;
varying vec3 vViewVector;

// Maps a LOCAL uv (0..1 within one cell) + frame index -> atlas uv
vec2 flipbookCellUv(vec2 localUv, float frame) {
    float fx = mod(frame, uTilesX);
    float fy = floor(frame / uTilesX);
    vec2 cellSize = vec2(1.0 / uTilesX, 1.0 / uTilesY);
    // flip Y: row 0 of most baked atlases is the TOP row
    vec2 cellOrigin = vec2(fx, (uTilesY - 1.0 - fy)) * cellSize;
    return cellOrigin + clamp(localUv, 0.001, 0.999) * cellSize;
}

// Samples the flipbook with frame interpolation for smooth motion
vec4 sampleFlipbook(sampler2D tex, vec2 localUv, float time) {
    float totalDuration = uFrameCount / uFPS;
    float t = mod(time, totalDuration) / totalDuration;
    float frameFloat = t * uFrameCount;
    float frame0 = floor(frameFloat);
    float frame1 = mod(frame0 + 1.0, uFrameCount);
    float blend = fract(frameFloat);

    vec4 c0 = texture2D(tex, flipbookCellUv(localUv, frame0));
    vec4 c1 = texture2D(tex, flipbookCellUv(localUv, frame1));
    return mix(c0, c1, blend);
}

vec3 calculateVolumetricLight(vec3 lightPos, vec3 lightColor, vec2 localUv, vec3 viewDir) {
    vec3 lightDir = normalize(lightPos - vWorldPosition);

    float shadowAttenuation = 1.0;
    vec2 rayStep = lightDir.xy * 0.01; // scaled down: this is now cell-local space
    for (int i = 1; i <= 6; i++) {
        float stepDensity = sampleFlipbook(uDensityMap, localUv + rayStep * float(i), uTime).r;
        shadowAttenuation *= exp(-stepDensity * 1.5);
    }

    float diffuse = max(lightDir.z, 0.1);
    float backGlow = pow(max(dot(-viewDir, lightDir), 0.0), 3.0) * 2.0;

    float dist = length(lightPos - vWorldPosition);
    float attenuation = 1.0 / (1.0 + 0.2 * dist * dist);

    return lightColor * (diffuse + backGlow) * shadowAttenuation * attenuation;
}

void main() {
    vec3 viewDir = normalize(vViewVector);

    // 1. Sample flow vector from the SAME frame of the flow flipbook
    vec2 flowVector = sampleFlipbook(uFlowMap, vUv, uTime).rg;

    float phase0 = fract(uTime * uFlowSpeed);
    float phase1 = fract(uTime * uFlowSpeed + 0.5);

    vec2 uv0 = vUv - flowVector * phase0;
    vec2 uv1 = vUv - flowVector * phase1;
    float flowBlend = abs((phase0 - 0.5) * 2.0);

    // 2. Parallax displacement, kept LOCAL to the current cell (small offset)
    float height0 = sampleFlipbook(uDensityMap, uv0, uTime).r;
    float height1 = sampleFlipbook(uDensityMap, uv1, uTime).r;
    float height = mix(height0, height1, flowBlend);

    vec2 localUv = mix(uv0, uv1, flowBlend) - (viewDir.xy * height * uParallaxHeight * 0.15);

    float density = sampleFlipbook(uDensityMap, localUv, uTime).r;

    vec3 totalLighting = vec3(0.02);
    totalLighting += calculateVolumetricLight(uLightPos1, uLightColor1, localUv, viewDir);
    totalLighting += calculateVolumetricLight(uLightPos2, uLightColor2, localUv, viewDir);

    gl_FragColor = vec4(totalLighting * density, density * 0.95);
}
    `;
