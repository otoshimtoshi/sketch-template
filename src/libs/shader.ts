/**
 * A Shader wrapper function using the WebGLRenderingContext obtained with canvas.getContext("webgl")
 */
const $shader = (gl: WebGLRenderingContext) => {
  /**
   * $loadShader is a wrapper function for gl.createShader, gl.shaderSource, and gl.compileShader.
   *
   * @param source - A string containing the GLSL source code to set.
   * @param type - gl.VERTEX_SHADER or gl.FRAGMENT_SHADER
   * @returns WebGLShader | null
   */
  const $loadShader = (source: string, type: GLenum = gl.VERTEX_SHADER) => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error("Shader created failed:: shader is null!!");
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("An error occurred compiling the shader:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  /**
   * $initShaderProgram is a wrapper function for gl.createProgram, gl.attachShader, and gl.linkProgram.
   *
   * @param vertexShader - WebGLShader
   * @param fragmentShader - WebGLShader
   * @returns WebGLProgram | null
   */
  const $initShaderProgram = (vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) {
      console.error("Program created failed:: program is null!!");
      return null;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program:", gl.getProgramInfoLog(program));
      return null;
    }

    return program;
  };

  /**
   * $getUniforms returns uniform information for the specified program.
   *
   * @param program - WebGLProgram
   * @returns uniforms
   */
  const $getUniforms = (program: WebGLProgram) => {
    let uniforms: any = {};
    let uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < uniformCount; i++) {
      const info = gl.getActiveUniform(program, i);
      if (!info) return;
      uniforms[info.name] = gl.getUniformLocation(program, info.name);
    }
    return uniforms;
  };

  return {
    $loadShader,
    $initShaderProgram,
    $getUniforms,
  };
};

export { $shader };
