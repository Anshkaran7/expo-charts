import { registerWebModule, NativeModule } from 'expo';

import { ExpoChartsModuleEvents } from './ExpoCharts.types';

class ExpoChartsModule extends NativeModule<ExpoChartsModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoChartsModule);
