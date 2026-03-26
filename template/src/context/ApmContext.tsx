'use client';
import React, { createContext } from 'react';
import Script from 'next/script';
import { getPath } from '@/util/utilities';

interface IAppMonitoringContext {
}

const ApmContext = createContext<IAppMonitoringContext|null>(null);

export default function AppMonitoringProvider({children}: { children: React.ReactNode }) {

  return (
    <ApmContext.Provider value={null}>
      <Script src={getPath('/api/monitoring/newrelic')} async strategy='afterInteractive'/>
      {children}
    </ApmContext.Provider>
  );
}

// export const useMonitoring = () => {
//   const context = useContext(AppMonitoringContext);
//   if (!context) {
//     throw new Error('useMonitoring must be used within an AppMonitoringContextProvider');
//   }
//   return context;
// }
