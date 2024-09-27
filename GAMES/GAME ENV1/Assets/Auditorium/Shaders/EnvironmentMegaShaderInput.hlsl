#include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"

CBUFFER_START(UnityPerMaterial)
    half4 _Color;
    float4 _MainTex_ST;
    half4 _ShadowColor;
CBUFFER_END
