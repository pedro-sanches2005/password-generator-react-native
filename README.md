# SEC Pass Generator

Aplicativo gerador de senhas para celular, feito com React Native, Expo e TypeScript. O usuário escolhe o tamanho da senha e os tipos de caracteres que ela deve ter, gera a senha com um toque e copia o resultado para a área de transferência.

O projeto foi desenvolvido como atividade da faculdade, partindo de um gerador simples que já tinha os botões de gerar e copiar, e evoluído com novas funcionalidades.

## Funcionalidades

- Gerar uma senha aleatória com um toque no botão.
- Copiar a senha gerada para a área de transferência.
- Definir o tamanho da senha em caracteres.
- Botões que mudam de cor enquanto estão pressionados.
- Escolher quais tipos de caracteres entram na senha (funcionalidade extra da atividade).

### Tamanho da senha

Um campo numérico permite digitar quantos caracteres a senha deve ter, de 4 a 64. O campo aceita só dígitos e o valor inicial é 12. Se o campo ficar vazio ou o número estiver fora do intervalo, o app mostra uma mensagem de erro e não gera a senha.

### Cor dos botões ao pressionar

Os botões de gerar e de copiar ficam verdes (`#007c57`) em repouso e passam para amarelo (`#f2b705`) enquanto o dedo está sobre eles. Ao soltar, voltam ao verde. Isso é feito com o `Pressable` do React Native, que recebe o estilo como uma função do estado `pressed`:

```tsx
<Pressable
  style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
  onPress={handleGenButton}>
```

### Funcionalidade escolhida: seleção dos tipos de caracteres

Quatro chaves (switches) na tela permitem escolher o que entra na senha:

| Chave | Caracteres | Padrão |
| --- | --- | --- |
| Lowercase | `a-z` | ligada |
| Uppercase | `A-Z` | ligada |
| Numbers | `0-9` | ligada |
| Symbols | `! @ # $ % & * ? - _ + =` | desligada |

Regras de funcionamento:

- A senha usa somente os tipos que estão ligados.
- Cada tipo ligado aparece pelo menos uma vez na senha. Isso evita, por exemplo, uma senha só com letras mesmo com números ligados.
- Depois de garantir um caractere de cada tipo, o restante do tamanho é preenchido sorteando entre todos os tipos ligados, e no final os caracteres são embaralhados (algoritmo Fisher-Yates) para que os garantidos não fiquem sempre no começo.
- Se todas as chaves estiverem desligadas, o app avisa que é preciso ligar pelo menos uma e não gera senha.

Escolhi essa funcionalidade porque muitos sites exigem combinações específicas, como pelo menos um número e um símbolo. Ela também substitui o gerador original, que sorteava apenas entre as letras `aeiou`.

## Tecnologias

- React Native 0.81
- Expo SDK 54
- React 19
- TypeScript
- expo-clipboard

## Como rodar

Pré-requisito: Node.js instalado e o app Expo Go no celular (ou um emulador Android ou simulador iOS).

```bash
git clone https://github.com/estevamwiu/password-generator-react-native.git
cd password-generator-react-native
npm install
npx expo start
```

Com o servidor aberto, leia o QR code com o Expo Go, ou aperte `a` para abrir no emulador Android e `i` para o simulador iOS.

Também estão disponíveis os scripts `npm run android` e `npm run ios`.

## Estrutura do projeto

```
App.tsx                         ponto de entrada, renderiza a tela Home
index.ts                        registro do app no Expo
src/
  screens/
    Home.tsx                    tela principal (com rolagem)
    HomeStyles.tsx
  components/
    Logo/                       título e imagem do app
    TextInputPass/              campo que mostra a senha gerada
    ButtonPass/                 campo de tamanho, botões e lógica da tela
    OptionToggle/               chave de cada tipo de caractere
  services/
    PasswordServices.ts         função que gera a senha
assets/                         ícones e logo
```

A lógica de gerar senha fica separada da interface em `services/PasswordServices.ts`. A função `generatePass` recebe as opções (tamanho e tipos de caracteres) e devolve a senha, sem depender de nenhum componente.

## Limitações

A senha é sorteada com `Math.random()`, que é suficiente para o objetivo do exercício mas não é um gerador criptograficamente seguro. Para uso real, o próximo passo seria trocar o sorteio por `expo-crypto`.
