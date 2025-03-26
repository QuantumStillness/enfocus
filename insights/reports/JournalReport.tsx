
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface JournalReportProps {
  eventDistributionData: Array<{ name: string; events: number }>;
  timeframe: string;
}

const JournalReport: React.FC<JournalReportProps> = ({ eventDistributionData, timeframe }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Journal Entries Distribution</CardTitle>
        <CardDescription>
          When you tend to journal the most ({timeframe})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart data={eventDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" name="Journal Entries" fill="#8884d8" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalReport;
