
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import AnimatedTransition from "@/components/AnimatedTransition";
import { meditationGuides } from "@/data/meditationGuides";
import { MeditationGuide } from "@/types/meditation";
import { MeditationCard } from "@/components/meditation";

const Meditations = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<MeditationGuide | null>(null);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="journal-container">
          <div className="text-center mb-12">
            <AnimatedTransition>
              <h1 className="text-3xl font-light text-gray-800 mb-2">Guided Meditations</h1>
            </AnimatedTransition>
            <AnimatedTransition delay={100}>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Explore guided meditations designed to help resolve internal conflicts, 
                balance energy, and deepen your self-awareness practice. 
                Take notes on your experiences and download templates for offline practice.
              </p>
            </AnimatedTransition>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditationGuides.map((meditation, index) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                index={index}
                onSelectMeditation={setSelectedMeditation}
                selectedMeditation={selectedMeditation}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Meditations;
