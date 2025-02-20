import * as React from 'react';

import { ExpoChartsViewProps } from './ExpoCharts.types';

export default function ExpoChartsView(props: ExpoChartsViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
