
import React from 'react';
import { toast } from "sonner";

interface IntentionHandlersProps {
  content: string;
  setContent: (content: string) => void;
}

export const useIntentionHandlers = ({
  content,
  setContent
}: IntentionHandlersProps) => {
  const handleIntentionApply = (intention: string, gratitude: string, affirmation: string) => {
    let intentionContent = "## My Intentions\n\n";
    
    if (intention) {
      intentionContent += `### Daily Intention\n${intention}\n\n`;
    }
    
    if (gratitude) {
      intentionContent += `### Gratitude\n${gratitude}\n\n`;
    }
    
    if (affirmation) {
      intentionContent += `### Affirmation\n${affirmation}\n\n`;
    }
    
    if (content.includes("## My Intentions")) {
      // Replace existing intentions section
      const beforeIntentions = content.split("## My Intentions")[0];
      const afterIntentions = content.includes("##", content.indexOf("## My Intentions") + 5) 
        ? "##" + content.split("##").slice(content.split("##").findIndex(s => s.includes("My Intentions")) + 1).join("##")
        : "";
      
      setContent(beforeIntentions + intentionContent + afterIntentions);
    } else {
      // Add new intentions section at the beginning or after emotions if they exist
      if (content.includes("**Emotion:**")) {
        const parts = content.split("**Emotion:**");
        const firstPart = parts[0] + "**Emotion:**" + parts[1].split("\n\n")[0] + "\n\n";
        const restPart = parts[1].split("\n\n").slice(1).join("\n\n");
        setContent(firstPart + intentionContent + restPart);
      } else {
        setContent(intentionContent + content);
      }
    }
    
    toast.success("Intentions added to journal entry");
  };

  return { handleIntentionApply };
};

export default useIntentionHandlers;
