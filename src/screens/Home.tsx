import React, { useState } from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Switch,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { styles } from './HomeStyles';
import { generatePasswordService } from '../services/PasswordServices';

export default function Home() {
  const [developerName, setDeveloperName] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [length, setLength] = useState('8');
  const [useNumbers, setUseNumbers] = useState(false);
  const [useSymbols, setUseSymbols] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState('');

  // Evento onPress: Registrar Credencial
  const handleRegister = () => {
    if (!developerName.trim()) {
      Alert.alert('Aviso', 'Por favor, digite seu nome de desenvolvedor!');
      return;
    }
    Alert.alert('Sucesso', `Credencial registrada para: ${developerName}`);
  };

  // Evento onPress: Gerar Senha usando o service
  const handleGeneratePassword = () => {
    const numLength = parseInt(length, 10);
    if (isNaN(numLength) || numLength <= 0) {
      Alert.alert('Erro', 'Insira um tamanho válido para a senha.');
      return;
    }

    const newPassword = generatePasswordService(numLength, useNumbers, useSymbols);
    setGeneratedPassword(newPassword);
  };

  // Eventos onLongPress
  const handleLongPressHint = () => {
    Alert.alert(
      'Dica DevBadge',
      'Use letras maiúsculas e minúsculas ao registrar sua credencial.'
    );
  };

  const handleElementLongPress = (elementName: string) => {
    Alert.alert('Ação Avançada', `Você pressionou longamente o ${elementName}!`);
  };

  const handlePasswordLongPress = () => {
    Alert.alert(
      'Ações de Senha',
      'Senha copiada para a área de transferência!',
      [
        { text: 'Copiar Senha', onPress: () => {} },
        { text: 'Regerar', onPress: handleGeneratePassword },
        { text: 'Ok', style: 'cancel' },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Botão de Configuração Superior */}
      <View style={styles.headerRight}>
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={() => Alert.alert('Configurações', 'Menu de configurações')}
        >
          <Text style={{ color: '#aaa', fontSize: 18 }}>⚙</Text>
        </TouchableOpacity>
      </View>

      {/* Título Principal */}
      <Text style={styles.title}>DevBadge Profile</Text>
      <View style={styles.titleBorder} />

      {/* Status do Sistema */}
      <Text style={styles.statusText}>
        Status do Sistema: <Text style={styles.onlineText}>Online</Text>
      </Text>

      {/* Logo com Evento onLongPress */}
      <TouchableOpacity onLongPress={handleLongPressHint} activeOpacity={0.8}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>⚛</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.hintText}>(Pressione e segure para dicas)</Text>

      {/* InputText para Nome do Desenvolvedor */}
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome de desenvolvedor..."
        placeholderTextColor="#666"
        value={developerName}
        onChangeText={setDeveloperName}
      />

      {/* Button: Registrar Credencial */}
      <View style={styles.buttonContainer}>
        <Button title="REGISTRAR CREDENCIAL" color="#4A90E2" onPress={handleRegister} />
      </View>

      {/* Switch: Modo Admin */}
      <View style={styles.switchCard}>
        <Text style={styles.switchLabel}>Ativar Modo Admin?</Text>
        <Switch
          value={isAdmin}
          onValueChange={setIsAdmin}
          trackColor={{ false: '#333', true: '#4CD964' }}
          thumbColor="#fff"
        />
      </View>

      {/* Badge de Acesso Dinâmico */}
      <View style={[styles.accessBadge, isAdmin && styles.accessBadgeAdmin]}>
        <Text style={[styles.accessText, isAdmin && styles.accessTextAdmin]}>
          {isAdmin ? 'Acesso Total (Admin)' : 'Acesso Básico'}
        </Text>
      </View>

      {/* Lista de Elementos com onLongPress */}
      <TouchableOpacity
        style={styles.elementCard}
        onPress={() => Alert.alert('Elemento 1', 'Toque simples')}
        onLongPress={() => handleElementLongPress('Elemento 1')}
      >
        <Text style={styles.elementText}>Elemento 1</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.elementCard}
        onPress={() => Alert.alert('Elemento 2', 'Toque simples')}
        onLongPress={() => handleElementLongPress('Elemento 2')}
      >
        <Text style={styles.elementText}>Elemento 2</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.elementCard}
        onPress={() => Alert.alert('Elemento 3', 'Toque simples')}
        onLongPress={() => handleElementLongPress('Elemento 3')}
      >
        <Text style={styles.elementText}>Elemento 3</Text>
      </TouchableOpacity>

      {/* Seção do Gerador de Senhas */}
      <View style={styles.generatorSection}>
        <Text style={styles.sectionTitle}>Gerador de Senhas</Text>

        <TextInput
          style={styles.input}
          placeholder="Tamanho da Senha"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={length}
          onChangeText={setLength}
        />

        <View style={styles.switchCard}>
          <Text style={styles.switchLabel}>Incluir Números</Text>
          <Switch value={useNumbers} onValueChange={setUseNumbers} />
        </View>

        <View style={styles.switchCard}>
          <Text style={styles.switchLabel}>Incluir Símbolos</Text>
          <Switch value={useSymbols} onValueChange={setUseSymbols} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="GERAR SENHA" color="#3B99FC" onPress={handleGeneratePassword} />
        </View>

        {generatedPassword !== '' && (
          <TouchableOpacity
            style={styles.passwordDisplay}
            onLongPress={handlePasswordLongPress}
          >
            <Text style={styles.hintText}>Senha Gerada (Clique longo para opções):</Text>
            <Text style={styles.passwordText}>{generatedPassword}</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}