

export const FRACTALS_VERTEX_SHADER = `
#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

// attributes, in
attribute vec3 aPosition;
attribute vec2 aTexCoord;

// attributes, out
varying vec2 vTexCoord;

// matrices
uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

void main() {
    vTexCoord = aTexCoord; //Sending to frag
    gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
`

export const FRACTALS_FRAGMENT_SHADER = `
#ifdef GL_ES
      precision highp float;
      precision highp int;
#endif

uniform float iTime;
varying vec2 vTexCoord;

vec3 pallete(float t) {
    vec3 a = vec3(.5, .2893, .5);
    vec3 b = vec3(.5, .5, .7384);
    vec3 c = vec3(.7233, .436, 1.);
    vec3 d = vec3(.263, .416, .557);
    return a + b * cos(6.28318*(c*t+d));
}

void main() {
  vec2 uv = vTexCoord * 2.0 - 1.0;
  uv.x *= (uv.x / uv.y);

  vec2 uv0 = uv;
  vec3 finalColor = vec3(0.0);

  for(float i = 0.; i < 5.; i++) {
    uv = fract(uv * 1.5) - 0.5;
    float d = length(uv) * exp(-length(uv0));

    vec3 col = pallete(length(uv0) + i*.4+ iTime * .4);

    d = sin(d * 8. + iTime)/8.;
    d = abs(d);
    d = pow(0.01 / d, 1.2);

    finalColor += col * d/3.;
  }

  gl_FragColor = vec4(finalColor, 1.);
}
`