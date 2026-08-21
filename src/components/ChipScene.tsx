import React from 'react';
import { HeroChip3D } from './HeroChip3D.tsx';

const ChipScene: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-3xl">
      <HeroChip3D />
    </div>
  );
};

export default ChipScene;