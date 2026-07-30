export const simulationFrag = `
uniform sampler2D uDensityMap;
uniform sampler2D uVelocityMap;
uniform float uTime;
uniform vec2 uGridDimensions; // e.g., vec2(5.0, 5.0)
uniform float uSpeed;          // e.g., 3.0
uniform float uFlowStrength;   // e.g., 0.02

varying vec2 vUv;

// Converts local UV [0..1] inside a single tile to global texture atlas UVs
vec2 getTileUV(vec2 localUV, float frameIndex, vec2 grid) {
    float col = mod(frameIndex, grid.x);
    float row = floor(frameIndex / grid.x);
    
    // Unreal tile flipbook row inversion
    row = (grid.y - 1.0) - row; 

    // Clamp local UV to prevent bleed into neighbor tiles during advection
    vec2 clampedLocal = clamp(localUV, 0.001, 0.999);
    
    vec2 tileSize = 1.0 / grid;
    return (clampedLocal + vec2(col, row)) * tileSize;
}

void main() {
    float totalFrames = uGridDimensions.x * uGridDimensions.y;
    
    // Continuous time progress
    float progress = mod(uTime * uSpeed, totalFrames);
    float frameA = floor(progress);
    float frameB = mod(frameA + 1.0, totalFrames);
    float lerpFactor = fract(progress);

    // 1. Base Tile Atlas Coordinates
    vec2 baseUvA = getTileUV(vUv, frameA, uGridDimensions);
    vec2 baseUvB = getTileUV(vUv, frameB, uGridDimensions);

    // 2. Read Velocity Vectors from UNDISTORTED tile centers first (prevents feedback jitter)
    // Note: EXR velocity from FluidNinja stores directional flow in R and G channels.
    vec2 flowA = texture2D(uVelocityMap, baseUvA).rg * 2.0 - 1.0;
    vec2 flowB = texture2D(uVelocityMap, baseUvB).rg * 2.0 - 1.0;

    // 3. Dual-time Advection Distortions (Symmetric flow warp)
    // Frame A warps forward into time (+ lerpFactor)
    // Frame B warps backward into time (- (1.0 - lerpFactor))
    vec2 distortedLocalUvA = vUv - (flowA * lerpFactor * uFlowStrength);
    vec2 distortedLocalUvB = vUv + (flowB * (1.0 - lerpFactor) * uFlowStrength);

    // 4. Map distorted local coordinates back into tile grid space
    vec2 finalUvA = getTileUV(distortedLocalUvA, frameA, uGridDimensions);
    vec2 finalUvB = getTileUV(distortedLocalUvB, frameB, uGridDimensions);

    // 5. Sample and cross-fade density
    vec4 sampleA = texture2D(uDensityMap, finalUvA);
    vec4 sampleB = texture2D(uDensityMap, finalUvB);
    vec4 finalColor = mix(sampleA, sampleB, lerpFactor);

    // 6. Soft edge vignette (removes square borders)
    vec2 border = smoothstep(vec2(0.0), vec2(0.08), vUv) * smoothstep(vec2(1.0), vec2(0.92), vUv);
    float mask = border.x * border.y;

    gl_FragColor = finalColor * mask;
}
`;
