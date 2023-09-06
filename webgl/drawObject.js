function drawObject(gl, locationInfo, Buffers, vertexCount, MVP, lightPosition) {
    gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.positionBuffer);
    gl.vertexAttribPointer(locationInfo.attribLocations.vertexPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locationInfo.attribLocations.vertexPosition);

    // gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.colorBuffer);
    // gl.vertexAttribPointer(locationInfo.attribLocations.vertexColor, 3, gl.FLOAT, false, 0, 0);
    // gl.enableVertexAttribArray(locationInfo.attribLocations.vertexColor);

    gl.bindBuffer(gl.ARRAY_BUFFER, Buffers.normalBuffer);
    gl.vertexAttribPointer(locationInfo.attribLocations.vertexNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(locationInfo.attribLocations.vertexNormal);
  
    gl.useProgram(locationInfo.program);
  
    gl.uniformMatrix4fv(locationInfo.uniformLocations.projectionMatrix, false, MVP.projectionMatrix);
    gl.uniformMatrix4fv(locationInfo.uniformLocations.viewMatrix, false, MVP.viewMatrix);
    gl.uniformMatrix4fv(locationInfo.uniformLocations.modelMatrix, false, MVP.modelMatrix);
    gl.uniform3f(locationInfo.uniformLocations.lightPosition, lightPosition[0], lightPosition[1], lightPosition[2]);
  
    {
      const offset = 0;
      gl.drawArrays(gl.TRIANGLES, offset, vertexCount);
    }
  }
  
  export { drawObject };