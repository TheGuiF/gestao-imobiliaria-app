import React, { useState } from 'react';
import RedButton from '../../components/redButton';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const MyForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const combinedFunctions = () => {
    navigation.navigate('Home'); //Volta para a página inicial
  }

  const validateForm = () => {
    let isValid = true;
    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', { name, email });
    } else {
      console.log('Form has errors');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        onBlur={validateForm}
      />
      {nameError ? <Text style={styles.error}>{nameError}</Text> : null}

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        onBlur={validateForm}
      />
      {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

      <Button title="Submit" onPress={handleSubmit} />

      <RedButton title="Finalizar" onPress={combinedFunctions} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default MyForm;