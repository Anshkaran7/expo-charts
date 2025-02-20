import { NativeModule, requireNativeModule } from 'expo';

import { ExpoChartsModuleEvents } from './ExpoCharts.types';

declare class ExpoChartsModule extends NativeModule<ExpoChartsModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoChartsModule>('ExpoCharts');
