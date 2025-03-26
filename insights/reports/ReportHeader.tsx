
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ReportHeaderProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ timeframe, setTimeframe }) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-medium">Progress Reports</h2>
      <Select defaultValue={timeframe} onValueChange={setTimeframe}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select timeframe" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="weekly">Weekly</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default ReportHeader;
