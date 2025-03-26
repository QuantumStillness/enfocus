
// Utility functions for the Archive component
export const getFormattedDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const getChakraColor = (chakra: string) => {
  const colors: Record<string, string> = {
    "Root": "bg-chakra-root text-white",
    "Sacral": "bg-chakra-sacral text-white",
    "Solar": "bg-chakra-solar text-black",
    "Heart": "bg-chakra-heart text-white",
    "Throat": "bg-chakra-throat text-white",
    "Third Eye": "bg-chakra-third text-white",
    "Crown": "bg-chakra-crown text-white"
  };
  
  return colors[chakra] || "bg-gray-200 text-gray-800";
};
