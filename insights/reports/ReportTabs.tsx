
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PieChart, BarChart, TrendingUp, Target } from 'lucide-react';
import TwelveWeekReport from './TwelveWeekReport';
import ChakraReport from './ChakraReport';
import JournalReport from './JournalReport';
import MeditationReport from './MeditationReport';

interface ReportTabsProps {
  twelveWeekData: any;
  chakraData: any;
  eventDistributionData: any;
  meditationData: any;
  timeframe: string;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ 
  twelveWeekData, 
  chakraData, 
  eventDistributionData, 
  meditationData, 
  timeframe 
}) => {
  return (
    <Tabs defaultValue="twelve-week">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="twelve-week" className="flex items-center gap-1">
          <Target className="h-4 w-4" />
          <span>12-Week Progress</span>
        </TabsTrigger>
        <TabsTrigger value="chakra" className="flex items-center gap-1">
          <PieChart className="h-4 w-4" />
          <span>Energy Balance</span>
        </TabsTrigger>
        <TabsTrigger value="journal" className="flex items-center gap-1">
          <BarChart className="h-4 w-4" />
          <span>Journal Activity</span>
        </TabsTrigger>
        <TabsTrigger value="meditation" className="flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          <span>Meditation</span>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="twelve-week">
        <TwelveWeekReport twelveWeekData={twelveWeekData} />
      </TabsContent>
      
      <TabsContent value="chakra">
        <ChakraReport chakraData={chakraData} />
      </TabsContent>
      
      <TabsContent value="journal">
        <JournalReport 
          eventDistributionData={eventDistributionData} 
          timeframe={timeframe} 
        />
      </TabsContent>
      
      <TabsContent value="meditation">
        <MeditationReport meditationData={meditationData} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
