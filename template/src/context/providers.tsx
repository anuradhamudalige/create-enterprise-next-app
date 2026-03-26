'use client';
import React from 'react';
import AppMonitoringProvider from '@/context/ApmContext';

export function Providers({children}: { children: React.ReactNode }) {

  return (
    <AppMonitoringProvider>
      {children}
    </AppMonitoringProvider>
  );
}
