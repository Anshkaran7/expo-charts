import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoChartsViewProps } from './ExpoCharts.types';

const NativeView: React.ComponentType<ExpoChartsViewProps> =
  requireNativeView('ExpoCharts');

export default function ExpoChartsView(props: ExpoChartsViewProps) {
  return <NativeView {...props} />;
}
