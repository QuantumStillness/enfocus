
import React from 'react';
import { Loader2 } from "lucide-react";
import AnimatedTransition from '../AnimatedTransition';
import { useAuth } from '@/contexts/AuthContext';
import { useIntentions } from '@/hooks/useIntentions';
import IntentionForm from './IntentionForm';
import IntentionDateSelector from './IntentionDateSelector';

interface IntentionSetterProps {
  compact?: boolean;
}

const IntentionSetter = ({ compact = false }: IntentionSetterProps) => {
  const { user } = useAuth();
  const {
    date,
    setDate,
    intention,
    setIntention,
    gratitude,
    setGratitude,
    affirmation,
    setAffirmation,
    loading,
    saving,
    saveIntentions
  } = useIntentions(user?.id);

  return (
    <div className="space-y-4">
      {!compact && (
        <AnimatedTransition delay={100}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-medium">Set Your Intentions</h2>
            <IntentionDateSelector date={date} setDate={setDate} />
          </div>
        </AnimatedTransition>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <IntentionForm
          intention={intention}
          gratitude={gratitude}
          affirmation={affirmation}
          setIntention={setIntention}
          setGratitude={setGratitude}
          setAffirmation={setAffirmation}
          handleSave={saveIntentions}
          saving={saving}
          isAuthenticated={!!user}
          compact={compact}
        />
      )}
    </div>
  );
};

export default IntentionSetter;
