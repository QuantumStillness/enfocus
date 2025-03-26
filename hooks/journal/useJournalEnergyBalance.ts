
import { toast } from "sonner";

export const useJournalEnergyBalance = (
  content: string, 
  setContent: (content: string) => void
) => {
  const handleEnergyBalanceApply = (chakras: Record<string, number[]>) => {
    let energyContent = "## Energy Balance\n\n";
    
    Object.entries(chakras).forEach(([chakra, values]) => {
      if (values && values.length > 0) {
        energyContent += `- **${chakra}**: ${values[0]}%\n`;
      }
    });
    
    energyContent += "\n";
    
    if (content.includes("## Energy Balance")) {
      // Replace existing energy balance section
      const beforeEnergy = content.split("## Energy Balance")[0];
      const afterEnergy = content.includes("##", content.indexOf("## Energy Balance") + 5)
        ? "##" + content.split("##").slice(content.split("##").findIndex(s => s.includes("Energy Balance")) + 1).join("##")
        : "";
      
      setContent(beforeEnergy + energyContent + afterEnergy);
    } else {
      // Add new energy balance section after intentions if they exist, otherwise at the beginning
      if (content.includes("## My Intentions")) {
        const parts = content.split("## My Intentions");
        const intentionsSection = "## My Intentions" + parts[1].split("##")[0];
        const restPart = parts[1].includes("##") ? "##" + parts[1].split("##").slice(1).join("##") : "";
        setContent(parts[0] + intentionsSection + energyContent + restPart);
      } else if (content.includes("**Emotion:**")) {
        const parts = content.split("**Emotion:**");
        const firstPart = parts[0] + "**Emotion:**" + parts[1].split("\n\n")[0] + "\n\n";
        const restPart = parts[1].split("\n\n").slice(1).join("\n\n");
        setContent(firstPart + energyContent + restPart);
      } else {
        setContent(energyContent + content);
      }
    }
    
    toast.success("Energy balance added to journal entry");
  };

  return { handleEnergyBalanceApply };
};
