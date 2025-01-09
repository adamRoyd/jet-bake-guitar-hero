
let shaderProgram;
const numFunctionsMax = 5;
let numFunctionsSlider;
const functionNames = ["sin", "cos", "tan", "sqrt", "abs"];
let functions = [];

const vertShader = `
precision highp float;

attribute vec3 aPosition;
attribute vec2 aTexCoord;

varying vec2 vTexCoord;

void main() {
  vTexCoord = aTexCoord;
  gl_Position = vec4(aPosition, 1.0);
}
`;

const fragShader = `
precision highp float;

varying vec2 vTexCoord;

uniform vec2 u_resolution;
uniform int u_numFunctions;
uniform int u_functionTypes[5];
uniform float u_freqX[5];
uniform float u_freqY[5];
uniform float u_amp[5];
uniform float u_offset[5];
uniform float u_time; // Add time uniform

float applyFunction(int type, float x, float y) {
  if (type == 0) return sin(x + y);
  if (type == 1) return cos(x + y);
  if (type == 2) {
    float temp = tan(x + y);
    return abs(temp) > 100.0 ? 0.0 : temp;
  }
  if (type == 3) return sqrt(abs(x) + abs(y));
  if (type == 4) return abs(x + y);
  return 0.0;
}

void main() {
  float aspect = u_resolution.x / u_resolution.y;

  vec2 uv = vTexCoord * 2.0 - 1.0;
  uv.x *= aspect;

  float scaleFactor = 6.0;

  float mappedX = uv.x * scaleFactor * 3.141592653589793;
  float mappedY = uv.y * scaleFactor * 3.141592653589793;

  float patternValue = 0.0;

  for (int i = 0; i < 5; i++) {
    if (i >= u_numFunctions) break;

    float timeFactor = u_time * 0.5; // Adjust speed of movement
    float inputX = mappedX * u_freqX[i] + timeFactor;
    float inputY = mappedY * u_freqY[i] + timeFactor;
    float funcVal = applyFunction(u_functionTypes[i], inputX, inputY);
    float calcValue = funcVal * u_amp[i] + u_offset[i];

    patternValue += calcValue;
  }

  float r = clamp(255.0 - mod(patternValue * 50.0, 255.0), 0.0, 255.0);
  float g = clamp(255.0 - mod(patternValue * 100.0, 255.0), 0.0, 255.0);
  float b = clamp(255.0 - mod(patternValue * 150.0, 255.0), 0.0, 255.0);
  vec3 originalColor = vec3(r, g, b) / 255.0;

  gl_FragColor = vec4(originalColor, 1.0);
}
`;

function setupBackground() {
    noStroke();

    shaderProgram = createShader(vertShader, fragShader);
    shader(shaderProgram);
  
    initFunctions();
    updateShader();
}

function drawBackground() {
    shader(shaderProgram);

    const numFunctions = constrain(int(3), 1, numFunctionsMax);
  
    const functionTypes = [];
    const freqX = [];
    const freqY = [];
    const amp = [];
    const offset = [];
  
    for (let i = 0; i < numFunctionsMax; i++) {
      if (i < numFunctions) {
        functionTypes.push(functionNames.indexOf(functions[i].type));
        freqX.push(functions[i].freqX);
        freqY.push(functions[i].freqY);
        amp.push(functions[i].amp);
        offset.push(functions[i].offset);
      } else {
        functionTypes.push(0);
        freqX.push(1.0);
        freqY.push(1.0);
        amp.push(0.0);
        offset.push(0.0);
      }
    }
  
    shaderProgram.setUniform("u_resolution", [width, height]);
    shaderProgram.setUniform("u_numFunctions", numFunctions);
    shaderProgram.setUniform("u_functionTypes", functionTypes);
    shaderProgram.setUniform("u_freqX", freqX);
    shaderProgram.setUniform("u_freqY", freqY);
    shaderProgram.setUniform("u_amp", amp);
    shaderProgram.setUniform("u_offset", offset);
    shaderProgram.setUniform("u_time", millis() / 1000.0); // Pass time in seconds
  
    beginShape(TRIANGLES);
    vertex(-1, -1, 0, 0, 0);
    vertex(1, -1, 0, 1, 0);
    vertex(1, 1, 0, 1, 1);
    vertex(-1, -1, 0, 0, 0);
    vertex(1, 1, 0, 1, 1);
    vertex(-1, 1, 0, 0, 1);
    endShape();
}

function initFunctions() {
    functions = [];
    for (let i = 0; i < numFunctionsMax; i++) {
      const funcName = random(functionNames);
      functions.push({
        type: funcName,
        freqX: random(0.5, 5),
        freqY: random(0.5, 5),
        amp: random(0.5, 2),
        offset: random(-1, 1),
      });
    }
  }
  
  function updateShader() {
    shader(shaderProgram);
  }
  