
import { toast } from "sonner";

// API key management
const NOTEBOOK_LM_API_KEY_STORAGE = 'notebook-lm-api-key';

export const saveApiKey = (apiKey: string): void => {
  localStorage.setItem(NOTEBOOK_LM_API_KEY_STORAGE, apiKey);
};

export const getApiKey = (): string | null => {
  return localStorage.getItem(NOTEBOOK_LM_API_KEY_STORAGE);
};

export const clearApiKey = (): void => {
  localStorage.removeItem(NOTEBOOK_LM_API_KEY_STORAGE);
};

// Generate audio from text
export const generateAudio = async (text: string, voice: string = 'default'): Promise<string | null> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    toast.error("NotebookLM API key not found. Please set your API key first.");
    return null;
  }
  
  try {
    // Making a request to a hypothetical NotebookLM API endpoint
    // In a real implementation, you would replace this with the actual API call
    const response = await fetch('https://api.notebooklm.com/audio/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        text,
        voice
      })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.audioUrl; // Assuming the API returns an audio URL
  } catch (error) {
    console.error('Error generating audio:', error);
    toast.error("Failed to generate audio. Please try again later.");
    return null;
  }
};

// A list of available voices for the API
export const availableVoices = [
  { id: 'default', name: 'Default' },
  { id: 'calm', name: 'Calm' },
  { id: 'soothing', name: 'Soothing' },
  { id: 'meditation', name: 'Meditation' }
];
