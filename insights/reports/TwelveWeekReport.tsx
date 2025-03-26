
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

interface TwelveWeekReportProps {
  twelveWeekData: {
    progressData: Array<{ name: string; value: number; color: string }>;
    weeklyProgressData: Array<{ name: string; completion: number; target: number }>;
  };
}

const TwelveWeekReport: React.FC<TwelveWeekReportProps> = ({ twelveWeekData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>12-Week Year Progress</CardTitle>
          <CardDescription>
            Overall completion of your 12-week goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={twelveWeekData.progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {twelveWeekData.progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Weekly Goal Completion</CardTitle>
          <CardDescription>
            Progress by week in your 12-week year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={twelveWeekData.weeklyProgressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} interval={1} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completion" name="Completion %" fill="#8884d8" />
                <Line type="monotone" dataKey="target" stroke="#ff7300" strokeWidth={2} dot={false} />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwelveWeekReport;
