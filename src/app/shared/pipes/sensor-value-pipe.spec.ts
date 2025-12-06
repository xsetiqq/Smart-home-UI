import { SensorValuePipe } from './sensor-value-pipe';

describe('SensorValuePipe', () => {
  it('create an instance', () => {
    const pipe = new SensorValuePipe();
    const input = { amount: 24.5, unit: '°C' };
    const result = pipe.transform(input);
    expect(result).toBe('24.5 °C');
  });
});
