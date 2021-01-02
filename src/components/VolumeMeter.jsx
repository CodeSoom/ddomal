import React from 'react';

import { useVolumeCanvas } from '../hooks/volumeCanvas';

function VolumeMeter() {
  const canvasRef = useVolumeCanvas();

  return (
    <canvas ref={canvasRef} width="220.8px" height="220.8px" />
  );
}

export default React.memo(VolumeMeter);
