
import React, { useRef, useEffect } from 'react';
import { usePlayer } from '../hooks/usePlayer';

const Visualizer: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { analyser, isPlaying } = usePlayer();

  useEffect(() => {
    if (!analyser || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameId = requestAnimationFrame(renderFrame);
      analyser.getByteFrequencyData(dataArray);

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const barWidth = (width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = dataArray[i] / 2;
        
        const r = barHeight + (25 * (i/bufferLength));
        const g = 250 * (i/bufferLength);
        const b = 150;

        ctx.fillStyle = `rgba(${r},${g},${b},0.8)`;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    if (isPlaying) {
      renderFrame();
    } else {
      cancelAnimationFrame(animationFrameId);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [analyser, isPlaying]);

  if (!analyser) return null;

  return <canvas ref={canvasRef} width="1000" height="100" className="w-full h-24 mb-6" />;
};

export default Visualizer;
