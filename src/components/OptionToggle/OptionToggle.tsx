import { View, Text, Switch } from 'react-native';
import { styles } from './OptionToggleStyles';

interface OptionToggleProps {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

export function OptionToggle(props: OptionToggleProps) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{props.label}</Text>
      <Switch
        value={props.value}
        onValueChange={props.onChange}
        trackColor={{ false: '#4a6a8a', true: '#007c57' }}
        thumbColor="#ffffff"
      />
    </View>
  );
}
