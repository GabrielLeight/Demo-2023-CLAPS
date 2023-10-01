/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,  { useState }from 'react';
import axios from 'axios';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useNavigation } from '@react-navigation/native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
   
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const submitForm = (event: React.FormEvent) => {
    
    //event.preventDefault();
    // Add your form submission logic here
  };

  const create = () => {
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
        is_active: true, // Set this as needed
      });

      // Handle success, e.g., navigate to a new screen or display a success message
      console.log('User registered:', response.data);
    } catch (error) {
      // Handle error, e.g., display an error message
      console.error('Registration failed:', error);
    }
  };

  return (
    <>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput 
        style={styles.input}
        placeholder="Enter your email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}

        placeholder="Enter your password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        value={password}
      />
      <TouchableOpacity style={styles.button} onPress={submitForm}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={create}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      </>
  );
}

export {LoginForm};

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* Add the Form component here */}
          <LoginForm />
          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits. SALUDOS CLAPPERS
          </Section>
          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
});
export default App;
