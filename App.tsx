import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import BouncyCheckbox from "react-native-bouncy-checkbox";

const passwordSchema = yup.object().shape({
  passwordLength: yup
    .number()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be less than 12 characters")
    .typeError('Password length must be a number')
    .required("Password is required"),
})



const App = () => {
  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [numbers, setNumbers] = useState(false)
  const [symbols, setSymbols] = useState(false)

  const generatingPasswordString = (passwordLength: number) => {
    let characters = ''

    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numbersChars = '0123456789'
    const symbolChars = '!@#$%^&*()_+'

    if (lowerCase) characters += lowerCaseChars
    if (upperCase) characters += upperCaseChars
    if (numbers) characters += numbersChars
    if (symbols) characters += symbolChars

    if (!lowerCase && !upperCase && !numbers && !symbols) {
      Alert.alert('Please select atleast one character type')
      return;
    }

    let passwordResult = createPassword(characters, passwordLength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
    let pass = ""
    for (let i = 0; i < passwordLength; i++) {
      const index = Math.floor(Math.random() * characters.length)
      pass += characters.charAt(index)
    }
    return pass
  }

  const resetPassword = () => {
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(true)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={passwordSchema}
            onSubmit={(values) => {
              generatingPasswordString(+values.passwordLength)
            }}
          >{({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleSubmit,
            handleReset,
          }) => (
            <>
              <View style={styles.inputWrapper}>
                <View style={styles.inputColumn}>
                  <Text style={styles.heading}>Password Length</Text>
                  {touched.passwordLength && errors.passwordLength && (
                    <Text style={styles.errorText}>
                      {errors.passwordLength}
                    </Text>
                  )}
                </View>
                <TextInput
                  style={styles.inputStyle}
                  value={values.passwordLength}
                  onChangeText={handleChange('passwordLength')}
                  placeholder="EX. 6"
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Uppercase Letters</Text>
                <BouncyCheckbox
                  disableText
                  isChecked={upperCase}
                  onPress={() => setUpperCase(!upperCase)}
                  fillColor='#43BE31'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Lowercase Letters</Text>
                <BouncyCheckbox
                  disableText
                  isChecked={lowerCase}
                  onPress={() => setLowerCase(!lowerCase)}
                  fillColor='#4834DF'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Numbers</Text>
                <BouncyCheckbox
                  disableText
                  isChecked={numbers}
                  onPress={() => setNumbers(!numbers)}
                  fillColor='#E74292'
                />
              </View>
              <View style={styles.inputWrapper}>
                <Text style={styles.heading}>Include Symbols</Text>
                <BouncyCheckbox
                  disableText
                  isChecked={symbols}
                  onPress={() => setSymbols(!symbols)}
                  fillColor='#BB2CD9'
                />
              </View>
              <View style={styles.formActions}>
                <TouchableOpacity
                  disabled={!isValid}
                  style={[styles.primaryBtn]}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.primaryBtnTxt}>Generate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!isPassGenerated}
                  style={[styles.secondaryBtn]}
                  onPress={() => {
                    handleReset();
                    resetPassword();
                  }}
                >
                  <Text style={styles.secondaryBtnTxt}>Reset</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          </Formik>
        </View>
        {isPassGenerated && (
          <View style={[styles.card, styles.cardElevated]}>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
            <Text style={styles.description}>Long press to copy</Text>
          </View>
        )}
      </SafeAreaView>
    </ScrollView>
  )
}

export default App

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    color: '#16213e',
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    color: '#16213e',
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    color: '#16213e',
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#43BE31',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#E8290B',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
    flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000'
  },
});