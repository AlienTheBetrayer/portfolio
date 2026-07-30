export const smokeFrag = `
uniform sampler2D uRenderTarget;
uniform vec3 uLightPosition;
uniform vec3 uSmokeColor;
uniform vec3 uBaseColor;
uniform float uHeightScale;     // Set LOW! e.g. 0.02
uniform float uLightAbsorption;

varying vec2 vUv;
varying vec3 vLocalViewDir;
varying vec3 vWorldPosition;
varying vec3 vNormal;

const int STEPS = 12;

void main() {
    // 1. Calculate Parallax UV Offset based on Local Camera View
    // Gently sink the parallax texture along local UV coordinates
    vec2 pUv = vUv;
    vec2 deltaUv = vLocalViewDir.xy * uHeightScale / float(STEPS);

    float accumulatedDensity = 0.0;
    float stepWeight = 1.0 / float(STEPS);

    // 2. Raymarch inward
    for (int i = 0; i < STEPS; i++) {
        // Sample animated texture
        float density = texture2D(uRenderTarget, clamp(pUv, 0.001, 0.999)).r;
        
        accumulatedDensity += density * stepWeight;
        
        // Step deeper along ray
        pUv -= deltaUv;
    }

    // DISCARD empty background: Stops solid color boxes from blocking the cauldron
    if (accumulatedDensity < 0.03) {
        discard;
    }

    // 3. Simple Dynamic Lighting
    vec3 lightDir = normalize(uLightPosition - vWorldPosition);
    float NdotL = max(dot(vNormal, lightDir), 0.25);

    // Color compositing
    vec3 finalColor = mix(uBaseColor, uSmokeColor, accumulatedDensity * NdotL * 1.8);
    float alpha = smoothstep(0.03, 0.6, accumulatedDensity);

    gl_FragColor = vec4(finalColor, alpha);
}`;
