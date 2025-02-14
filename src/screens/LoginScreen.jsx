import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';

const LoginScreen = ({ navigation }) => {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onChange' });
  const [loginError, setLoginError] = useState('');

  const onSubmit = (data) => {
    if (data.email === "kmchanchal185@gmail.com" && data.password === "123456") {
      navigation.navigate("Home");
    } else {
      setLoginError("Invalid email or password");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" }
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {loginError !== "" && <Text style={styles.error}>{loginError}</Text>}

      <TouchableOpacity
        style={[styles.button, !isValid && styles.buttonDisabled]}
        onPress={handleSubmit(onSubmit)}
        disabled={!isValid}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
  error: { color: 'red', fontSize: 14, marginBottom: 10 },
  button: { backgroundColor: '#007bff', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#cccccc' },
  buttonText: { color: 'white', fontWeight: 'bold' }
});

export default LoginScreen;
