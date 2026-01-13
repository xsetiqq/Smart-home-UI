export interface SensorValue {
  amount: number;
  unit: string;
}

export interface SensorItem {
  type: 'sensor';
  id: string;
  icon: string;
  label: string;
  value: SensorValue;
}
