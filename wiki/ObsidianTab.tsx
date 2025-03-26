
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import VaultStructureTab from '@/components/markdown/VaultStructureTab';
import AdvancedFeaturesTab from '@/components/markdown/AdvancedFeaturesTab';
import TwelveWeekYearTab from '@/components/markdown/TwelveWeekYearTab';

const ObsidianTab: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="vault" className="w-full">
          <TabsList className="mb-4 w-full max-w-md mx-auto grid grid-cols-3">
            <TabsTrigger value="vault">Vault Structure</TabsTrigger>
            <TabsTrigger value="advanced">Advanced Features</TabsTrigger>
            <TabsTrigger value="twelveweek">12-Week Year</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vault">
            <VaultStructureTab />
          </TabsContent>
          
          <TabsContent value="advanced">
            <AdvancedFeaturesTab />
          </TabsContent>
          
          <TabsContent value="twelveweek">
            <TwelveWeekYearTab />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ObsidianTab;
