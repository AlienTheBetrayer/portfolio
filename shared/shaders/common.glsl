#ifndef COMMON_GLSL
#define COMMON_GLSL

const float PI = 3.14159265359;
const float EPSILON = 0.00001;

vec3 safeNormalize(vec3 v)
{
    float len = length(v);

    if(len < EPSILON)
        return vec3(0.0);

    return v / len;
}

float saturate(float x)
{
    return clamp(x,0.0,1.0);
}

#endif