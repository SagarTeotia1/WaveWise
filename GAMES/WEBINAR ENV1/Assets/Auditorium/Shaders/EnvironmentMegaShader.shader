Shader "Spatial/Environment/EnvironmentMegaShader"
{
    Properties
    {
        _MainTex ("Main Texture", 2D) = "white" {}
        _Color ("Main Color", Color) = (1, 1, 1, 1)
        _ShadowColor ("Realtime Shadow Color", Color) = (0, 0, 0, 1)
    }

    SubShader
    {
        // Universal Pipeline tag is required. If Universal render pipeline is not set in the graphics settings
        // this Subshader will fail. One can add a subshader below or fallback to Standard built-in to make this
        // material work with both Universal Render Pipeline and Builtin Unity Pipeline
        Tags{"RenderType" = "Opaque" "RenderPipeline" = "UniversalPipeline" "UniversalMaterialType" = "Unlit" "IgnoreProjector" = "True"}

        Pass
        {
            Name "UniversalForward"
            Tags{"LightMode" = "UniversalForward"}

            AlphaToMask [_AlphaToCoverage]

            HLSLPROGRAM
            #pragma vertex vert
            #pragma fragment frag

            // Global keywords
            #pragma multi_compile __ MSAA_DISABLED
            #pragma multi_compile _ _MAIN_LIGHT_SHADOWS
            #pragma multi_compile_fragment _ _SHADOWS_SOFT

            #pragma multi_compile_instancing
            #pragma multi_compile_fog
            #pragma multi_compile_fwdadd_fullshadows

            // Includes
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Lighting.hlsl"

            struct appdata
            {
                float4 vertex : POSITION;
                float2 uv : TEXCOORD0;
                float2 uv2 : TEXCOORD1; // lightmap uv
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct v2f
            {
                float4 vertex : SV_POSITION;
                float4 uv : TEXCOORD0;
                float4 shadowCoord : TEXCOORD1;
                float fogCoord : TEXCOORD2;
                UNITY_VERTEX_OUTPUT_STEREO
            };
            

            TEXTURE2D(_MainTex);
            SAMPLER(sampler_MainTex);

            // CBUFFER size should be the same between different passes so split 
            #include "EnvironmentMegaShaderInput.hlsl"

            v2f vert (appdata v)
            {
                v2f o = (v2f)0;
                UNITY_SETUP_INSTANCE_ID(v);
                UNITY_TRANSFER_INSTANCE_ID(v, o);
                UNITY_INITIALIZE_VERTEX_OUTPUT_STEREO(o);

                VertexPositionInputs vertexInput = GetVertexPositionInputs(v.vertex.xyz);
                o.vertex = vertexInput.positionCS;

                float2 lightmapUV = mad(v.uv2, unity_LightmapST.xy, unity_LightmapST.zw);
                float2 uv = TRANSFORM_TEX(v.uv, _MainTex);
                o.uv = float4(uv, lightmapUV);

                o.shadowCoord = TransformWorldToShadowCoord(vertexInput.positionWS);
                o.fogCoord = ComputeFogFactor(o.vertex.z);

                return o;
            }

            half4 frag (v2f i) : SV_Target
            {
                half4 col = SAMPLE_TEXTURE2D(_MainTex, sampler_MainTex, i.uv.xy);
                col.rgb *= _Color.rgb;

                real4 encodedIlluminance = SAMPLE_TEXTURE2D_LIGHTMAP(unity_Lightmap, samplerunity_Lightmap, i.uv.zw).rgba;
                half4 decodeInstructions = half4(LIGHTMAP_HDR_MULTIPLIER, LIGHTMAP_HDR_EXPONENT, 0.0h, 0.0h);
                half3 lightmap = DecodeLightmap(encodedIlluminance, decodeInstructions);
                col.rgb *= lightmap;

                ShadowSamplingData shadowSamplingData = GetMainLightShadowSamplingData();
                half4 shadowParams = GetMainLightShadowParams();
                half shadow = SampleShadowmap(TEXTURE2D_ARGS(_MainLightShadowmapTexture, sampler_MainLightShadowmapTexture), i.shadowCoord, shadowSamplingData, shadowParams, false);
                col.rgb = lerp(col.rgb * _ShadowColor.rgb, col.rgb, shadow);

                col.rgb = MixFog(col.rgb, i.fogCoord);
                return col;
            }
            ENDHLSL
        }

        Pass
        {
            Name "ShadowCaster"
            Tags{"LightMode" = "ShadowCaster"}

            ZWrite On
            ZTest LEqual
            ColorMask 0
            Cull[_Cull]

            HLSLPROGRAM
            //--------------------------------------
            // GPU Instancing
            #pragma multi_compile_instancing

            // -------------------------------------
            // Material Keywords
            #pragma shader_feature_local_fragment _ALPHATEST_ON
            #pragma shader_feature_local_fragment _SMOOTHNESS_TEXTURE_ALBEDO_CHANNEL_A

            #pragma vertex ShadowPassVertex
            #pragma fragment ShadowPassFragment

            #include "./EnvironmentMegaShaderInput.hlsl"

            /////////////////////////////////////////////////////////////////////////////////////////////////////////         
            // Below is copied from "Packages/com.unity.render-pipelines.universal/Shaders/ShadowCasterPass.hlsl"
            /////////////////////////////////////////////////////////////////////////////////////////////////////////
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Core.hlsl"
            #include "Packages/com.unity.render-pipelines.core/ShaderLibrary/CommonMaterial.hlsl"
            #include "Packages/com.unity.render-pipelines.universal/ShaderLibrary/Shadows.hlsl"

            float3 _LightDirection;

            struct Attributes
            {
                float4 positionOS   : POSITION;
                float3 normalOS     : NORMAL;
                float2 texcoord     : TEXCOORD0;
                UNITY_VERTEX_INPUT_INSTANCE_ID
            };

            struct Varyings
            {
                float2 uv           : TEXCOORD0;
                float4 positionCS   : SV_POSITION;
            };

            float4 GetShadowPositionHClip(Attributes input)
            {
                float3 positionWS = TransformObjectToWorld(input.positionOS.xyz);
                float3 normalWS = TransformObjectToWorldNormal(input.normalOS);

                float4 positionCS = TransformWorldToHClip(ApplyShadowBias(positionWS, normalWS, _LightDirection));

                #if UNITY_REVERSED_Z
                    positionCS.z = min(positionCS.z, positionCS.w * UNITY_NEAR_CLIP_VALUE);
                #else
                    positionCS.z = max(positionCS.z, positionCS.w * UNITY_NEAR_CLIP_VALUE);
                #endif

                return positionCS;
            }

            Varyings ShadowPassVertex(Attributes input)
            {
                Varyings output;
                UNITY_SETUP_INSTANCE_ID(input);

                output.uv = TRANSFORM_TEX(input.texcoord, _MainTex);
                output.positionCS = GetShadowPositionHClip(input);
                return output;
            }

            half4 ShadowPassFragment(Varyings input) : SV_TARGET
            {
                // Alpha(SampleAlbedoAlpha(input.uv, TEXTURE2D_ARGS(_BaseMap, sampler_BaseMap)).a, _BaseColor, _Cutoff);
                return 0;
            }
            ENDHLSL
        }

    }
    FallBack "VertexLit"
}
