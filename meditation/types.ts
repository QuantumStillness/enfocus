
import { MeditationGuide } from "@/types/meditation";

export interface MeditationCardProps {
  meditation: MeditationGuide;
  index: number;
  onSelectMeditation: (meditation: MeditationGuide) => void;
  selectedMeditation: MeditationGuide | null;
}

export interface MeditationPlayerProps {
  meditation: MeditationGuide;
  onClose: () => void;
}

export interface MeditationNotesProps {
  meditation: MeditationGuide;
}
