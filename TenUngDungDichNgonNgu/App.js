import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'react-native-elements';
import {Picker} from '@react-native-picker/picker';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [selectLanguage, setSelectLanguage] = useState('vi');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);

  const translateText = async () => {
    try {
      if (!inputText) {
        console.error('Input text is empty or undefined.');
        return;
      }

      setLoading(true);

      const response = await axios.post(
        'https://google-translate1.p.rapidapi.com/language/translate/v2',
        {q: inputText, target: selectLanguage},
        {
          headers: {
            'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com',
            'X-RapidAPI-Key':
              '9e89502408msh17bb85c4ea80a12p1fbe20jsnc6f9ce69f63a',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      );

      console.log('Input Text:', inputText);
      console.log('Response structure:', response.data);
      console.log('Language:', selectLanguage);

      if (
        response.data &&
        response.data.data &&
        response.data.data.translations
      ) {
        setTranslatedText(response.data.data.translations[0].translatedText);
      } else {
        console.error('Invalid response structure:', response.data);
      }
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter text to translate"
        value={inputText}
        onChangeText={text => setInputText(text)}
      />
      <Picker
        selectedValue={selectLanguage}
        style={{height: 40, width: 200}}
        onValueChange={(itemValue, itemIndex) => setSelectLanguage(itemValue)}>
        <Picker.Item label="Tiếng Việt" value="vi" />
        <Picker.Item label="Tiếng Anh" value="en" />
        <Picker.Item label="Tiếng Pháp" value="fr" />
      </Picker>
      <Button title="Translate" onPress={translateText} disabled={loading} />
      {loading && <ActivityIndicator size="small" color="#0000ff" />}
      <Text style={styles.resultText}>
        Translation result: {translatedText}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f0f0f0', // Màu nền
    borderRadius: 10, // Góc bo tròn
    alignItems: 'center', // Căn giữa theo chiều ngang
    justifyContent: 'center', // Căn giữa theo chiều dọc
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5, // Góc bo tròn cho input
    width: '80%', // Chiều rộng 80% của màn hình
  },
  resultText: {
    marginTop: 10,
    fontSize: 18, // Cỡ chữ
    fontWeight: 'bold', // Chữ đậm
    color: '#333', // Màu chữ
  },
});

export default App;


