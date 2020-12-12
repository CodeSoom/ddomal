import React, { useEffect, useRef, useState } from 'react';

import context from '../services/instances/audioContext.instance';
import { tertiaryColor } from '../styles/colors';

export default function VolumeMeter() {
  const [analyser] = useState(() => context.createAnalyser());
  const [dataArray] = useState(new Uint8Array(analyser.frequencyBinCount));

  const canvasRef = useRef(null);

  analyser.fftSize = 256;

  const draw = (ctx, sum) => {
    if (!ctx) {
      return;
    }
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = tertiaryColor;
    ctx.beginPath();
    ctx.arc(110.4, 110.4, sum / 200 + 50, 0, 2 * Math.PI);
    ctx.fill();
  };

  async function getData() {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });

    const source = context.createMediaStreamSource(stream);
    source.connect(analyser);
  }

  useEffect(() => {
    getData();

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext('2d');

    let animationId;
    function render() {
      analyser.getByteFrequencyData(dataArray);

      const sum = dataArray.reduce((acc, curr) => acc + curr, 0);

      draw(canvasContext, sum);
      animationId = window.requestAnimationFrame(render);
    }
    render();

    return () => {
      console.log(animationId);
      window.cancelAnimationFrame(animationId);
    };
  }, [draw]);

  return (
    <canvas ref={canvasRef} width="220.8px" height="220.8px" />
  );
}
