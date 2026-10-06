import { TextInput } from 'react-native';
import { styles } from './TextInputPassStyles';

interface TextInputPassProps {
  pass: string;
}

export function TextInputPass(props: TextInputPassProps) {
  return (
    <>
      <TextInput
            placeholder='Password'
            style={styles.inputer}
            value={props.pass}>
      </TextInput>
    </>
  );
}
