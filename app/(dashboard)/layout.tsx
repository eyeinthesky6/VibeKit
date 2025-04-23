'use client';

import React, { ReactNode } from 'react';
import LayoutWrapper from '@/components/Layout/Layout';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
