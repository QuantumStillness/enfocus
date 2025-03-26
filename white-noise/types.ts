
export type WhiteNoiseType = 'rain' | 'ocean' | 'forest' | 'whitenoise' | 'none';

export interface WhiteNoisePlayerProps {
  isPlaying: boolean;
  soundType: WhiteNoiseType;
  onChangeSoundType: (type: WhiteNoiseType) => void;
}

export interface SoundButtonsProps {
  soundType: WhiteNoiseType;
  onChangeSoundType: (type: WhiteNoiseType) => void;
}

export interface VolumeControlProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  isMuted: boolean;
  onMuteToggle: () => void;
}

export interface UseWhiteNoiseProps {
  isPlaying: boolean;
  soundType: WhiteNoiseType;
}

