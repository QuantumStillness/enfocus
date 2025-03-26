
import React from 'react';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';
import IntentionPrompts from './IntentionPrompts';
import { IntentionData } from './types';

interface IntentionFormProps {
  intention: string;
  gratitude: string;
  affirmation: string;
  setIntention: (value: string) => void;
  setGratitude: (value: string) => void;
  setAffirmation: (value: string) => void;
  handleSave: () => void;
  saving: boolean;
  isAuthenticated: boolean;
  compact?: boolean;
}

const IntentionForm: React.FC<IntentionFormProps> = ({
  intention,
  gratitude,
  affirmation,
  setIntention,
  setGratitude,
  setAffirmation,
  handleSave,
  saving,
  isAuthenticated,
  compact = false,
}) => {
  const handlePromptClick = (prompt: string) => {
    setIntention(prompt);
  };

  return (
    <>
      <AnimatedTransition delay={compact ? 0 : 200}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Daily Intention
            </label>
            <Textarea
              placeholder="Set your intention for today..."
              className="w-full resize-none"
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              rows={compact ? 2 : 3}
            />
            <IntentionPrompts onPromptClick={handlePromptClick} />
          </div>
        </div>
      </AnimatedTransition>

      <AnimatedTransition delay={compact ? 50 : 300}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Today I'm Grateful For
          </label>
          <Textarea
            placeholder="List three things you're grateful for..."
            className="w-full resize-none"
            value={gratitude}
            onChange={(e) => setGratitude(e.target.value)}
            rows={compact ? 2 : 3}
          />
        </div>
      </AnimatedTransition>

      <AnimatedTransition delay={compact ? 100 : 400}>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Affirmation
          </label>
          <Input
            placeholder="Enter a positive affirmation..."
            value={affirmation}
            onChange={(e) => setAffirmation(e.target.value)}
          />
        </div>
      </AnimatedTransition>

      <AnimatedTransition delay={compact ? 150 : 500}>
        <Button 
          onClick={handleSave}
          className="w-full mt-2"
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            'Set Intention'
          )}
        </Button>
        {!isAuthenticated && (
          <p className="text-xs text-center text-muted-foreground mt-2">
            Your intentions will be saved locally only
          </p>
        )}
      </AnimatedTransition>
    </>
  );
};

export default IntentionForm;
