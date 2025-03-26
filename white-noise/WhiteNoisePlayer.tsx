
import { useWhiteNoise } from './useWhiteNoise';
import VolumeControl from './VolumeControl';
import SoundButtons from './SoundButtons';
import { WhiteNoisePlayerProps } from './types';

const WhiteNoisePlayer = ({ isPlaying, soundType, onChangeSoundType }: WhiteNoisePlayerProps) => {
  const { volume, setVolume, isMuted, toggleMute } = useWhiteNoise({ isPlaying, soundType });
  
  return (
    <div className="space-y-4">
      <VolumeControl
        volume={volume}
        onVolumeChange={setVolume}
        isMuted={isMuted}
        onMuteToggle={toggleMute}
      />
      
      <SoundButtons
        soundType={soundType}
        onChangeSoundType={onChangeSoundType}
      />
    </div>
  );
};

export default WhiteNoisePlayer;

