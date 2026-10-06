import { useState } from 'react';
import { View, Pressable, Text, TextInput } from 'react-native';
import { styles } from './ButtonPassStyles';
import { TextInputPass } from '../TextInputPass/TexInputPass';
import { OptionToggle } from '../OptionToggle/OptionToggle';
import generatePass, { MIN_LENGTH, MAX_LENGTH } from '../../services/PasswordServices';

import * as Clipboard from 'expo-clipboard';

export function ButtonPass () {

    const [password, setPassword] = useState('');
    const [lengthText, setLengthText] = useState('12');
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [symbols, setSymbols] = useState(false);
    const [error, setError] = useState('');

    function handleGenButton () {
        const length = parseInt(lengthText, 10);

        if (isNaN(length) || length < MIN_LENGTH || length > MAX_LENGTH) {
            setError(`Choose a length between ${MIN_LENGTH} and ${MAX_LENGTH}.`);
            return;
        }

        if (!lowercase && !uppercase && !numbers && !symbols) {
            setError('Turn on at least one character type.');
            return;
        }

        setError('');
        setPassword(generatePass({ length, lowercase, uppercase, numbers, symbols }));
    }

    function handleCopyButton () {
        Clipboard.setStringAsync(password);
    }

    return (
        <View>
            <TextInputPass pass={password} />

            <Text style={styles.label}>Password length ({MIN_LENGTH} to {MAX_LENGTH})</Text>
            <TextInput
                style={styles.lengthInput}
                value={lengthText}
                onChangeText={(text) => setLengthText(text.replace(/[^0-9]/g, ''))}
                keyboardType="number-pad"
                maxLength={2}
                placeholder="12"
            />

            <View style={styles.options}>
                <OptionToggle label="Lowercase (a-z)" value={lowercase} onChange={setLowercase} />
                <OptionToggle label="Uppercase (A-Z)" value={uppercase} onChange={setUppercase} />
                <OptionToggle label="Numbers (0-9)" value={numbers} onChange={setNumbers} />
                <OptionToggle label="Symbols (!@#$)" value={symbols} onChange={setSymbols} />
            </View>

            {error !== '' && <Text style={styles.error}>{error}</Text>}

            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={handleGenButton}>
                <Text style={styles.text}>
                    🔑 Generate your password 🔑
                </Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
                onPress={() => handleCopyButton()}>
                <Text style={styles.text}>
                    🗒️ Copy to clipboard 🗒️
                </Text>
            </Pressable>
        </View>
    );
}
