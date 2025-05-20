import { CardLogin } from "@/src/components/card-login/card-login";
import { api } from "@/src/utils/server-config";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";

export const Login = () => {
  const [name, setName] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [loading, setLoading] = useState(false);

  const submit = () => {
    // const body = { username: "emilys", password: "emilyspass" };

    if (name?.length == 0) {
      Alert.alert(
        "Erro de Autenticação",
        "Por favor, verifique se o nome foi preenchida corretamente.",
        [{ text: "OK" }]
      );
    }
    if (password?.length == 0) {
      Alert.alert(
        "Erro de Autenticação",
        "Por favor, verifique se a senha foi preenchida corretamente.",
        [{ text: "OK" }]
      );
      return;
    }

    setLoading(true);
    api
      .post("/auth/login", {
        username: name,
        password: password,
      })
      .then((resp) => {
        console.log(" resp.data", resp.data);
        router.replace("/(tabs)");
        return resp.data;
      })
      .catch((err) => {
        alert("Erro no login");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardView}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <View style={styles.contentTop} />
          <View style={styles.contentBottom} />
          <View style={styles.contentAbsolute}>
            <Text style={styles.title}>Bem-vindo de volta!</Text>
            <Text style={styles.description}>
              Insira seus dados para entrar na sua conta.
            </Text>
            <CardLogin
              handleSubmit={submit}
              loading={loading}
              name={name}
              setValueName={setName}
              setValuePassword={setPassword}
              password={password}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
