
import React from 'react';
import ReportHeader from './reports/ReportHeader';
import ReportTabs from './reports/ReportTabs';
import { useReportData } from './reports/hooks/useReportData';

const ReportsSection = () => {
  const { timeframe, setTimeframe, twelveWeekData, chakraData, meditationData } = useReportData();

  return (
    <div className="space-y-6">
      <ReportHeader timeframe={timeframe} setTimeframe={setTimeframe} />
      <ReportTabs 
        twelveWeekData={twelveWeekData}
        chakraData={chakraData}
        eventDistributionData={twelveWeekData.eventDistributionData}
        meditationData={meditationData}
        timeframe={timeframe}
      />
    </div>
  );
};

export default ReportsSection;
