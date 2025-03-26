
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { toast } from "sonner";
import { supabase } from '@/integrations/supabase/client';
import { IntentionData } from '@/components/intentions/types';

export const useIntentions = (userId: string | undefined) => {
  const [date, setDate] = useState<Date>(new Date());
  const [intention, setIntention] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const formattedDate = format(date, 'yyyy-MM-dd');
  const localStorageKey = `intentions-${formattedDate}`;

  // Load intentions from localStorage or Supabase
  useEffect(() => {
    if (!userId) {
      const savedIntentions = localStorage.getItem(localStorageKey);
      if (savedIntentions) {
        try {
          const parsed = JSON.parse(savedIntentions);
          setIntention(parsed.intention || '');
          setGratitude(parsed.gratitude || '');
          setAffirmation(parsed.affirmation || '');
        } catch (error) {
          console.error("Error parsing saved intentions:", error);
        }
      } else {
        setIntention('');
        setGratitude('');
        setAffirmation('');
      }
      return;
    }
    
    const fetchIntention = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('intentions')
          .select('*')
          .eq('user_id', userId)
          .eq('date', formattedDate)
          .single();
        
        if (error && error.code !== 'PGRST116') {
          throw error;
        }
        
        if (data) {
          setIntention(data.intention || '');
          setGratitude(data.gratitude || '');
          setAffirmation(data.affirmation || '');
          
          localStorage.setItem(localStorageKey, JSON.stringify({
            intention: data.intention,
            gratitude: data.gratitude,
            affirmation: data.affirmation
          }));
        } else {
          setIntention('');
          setGratitude('');
          setAffirmation('');
        }
      } catch (error) {
        console.error("Error fetching intention:", error);
        toast.error("Could not load your intentions");
      } finally {
        setLoading(false);
      }
    };
    
    fetchIntention();
  }, [userId, formattedDate, localStorageKey]);

  // Save intentions to localStorage and/or Supabase
  const saveIntentions = async () => {
    localStorage.setItem(localStorageKey, JSON.stringify({
      intention,
      gratitude,
      affirmation
    }));
    
    if (!userId) {
      toast.success("Your intentions have been saved locally");
      return;
    }
    
    if (intention.trim() === '') {
      toast.error("Please set your intention for today");
      return;
    }
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('intentions')
        .upsert({
          user_id: userId,
          date: formattedDate,
          intention,
          gratitude,
          affirmation,
          updated_at: new Date().toISOString()
        });
      
      if (error) throw error;
      
      toast.success("Your intentions have been set for today");
    } catch (error) {
      console.error("Error saving intention:", error);
      toast.error("Could not save your intentions");
    } finally {
      setSaving(false);
    }
  };

  // Get current intention data
  const getCurrentIntentionData = (): IntentionData => {
    return {
      intention,
      gratitude,
      affirmation
    };
  };

  return {
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
    saveIntentions,
    getCurrentIntentionData
  };
};
