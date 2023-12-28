import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CustomInput from '../components/CustomInput';

import {register} from '../api/apiFunctions';
import {useRegister} from '../hooks/useRegister';
import {RootStackScreenProps} from '../navigations/types';
import {SubmitHandler} from 'react-hook-form';

interface Props extends RootStackScreenProps<'RegisterScreen'> {}
type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};
type RegisterScreenSubmit = SubmitHandler<RegisterFormValues>;

const RegisterScreen = ({navigation}: Props) => {
  const {control, handleSubmit} = useRegister();

  const onSubmit: RegisterScreenSubmit = async data => {
    try {
      const response = await register({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F7F9F7',
        justifyContent: 'center',
        padding: 13,
        position: 'relative',
      }}>
      <View
        style={{
          position: 'absolute',
          height: 350,
          width: 350,
          backgroundColor: '#719071',
          top: -260,
          left: -160,
          borderRadius: 130,
          transform: [{rotate: '35deg'}],
          opacity: 0.9,
        }}></View>

      <View
        style={{
          position: 'absolute',
          height: 370,
          width: 370,
          backgroundColor: '#719071',
          bottom: -280,
          right: -20,
          borderRadius: 120,
          transform: [{rotate: '35deg'}],
          opacity: 0.9,
        }}></View>
      <View
        style={{
          height: 640,
          width: '100%',
          borderRadius: 10,
          padding: 10,
          position: 'relative',
        }}>
        <Text
          style={{
            color: '#15212F',
            fontSize: 30,
            fontWeight: '700',
            textAlign: 'center',
          }}>
          Register
        </Text>

        <View
          style={{
            marginTop: 10,
            justifyContent: 'center',
            height: '80%',
          }}>
          <CustomInput
            control={control}
            height={40}
            placeholder="John Doe"
            inputType="text"
            label="Username"
            name="name"
          />
          <CustomInput
            control={control}
            height={40}
            placeholder="example@email.com"
            inputType="email"
            label="Email"
            name="email"
          />
          <CustomInput
            control={control}
            height={40}
            placeholder="your password"
            inputType="email"
            label="Password"
            name="password"
          />

          <CustomInput
            control={control}
            height={40}
            placeholder="cofirm password"
            inputType="text"
            label="Confirm Password"
            name="confirmPassword"
          />
          <View style={{alignItems: 'center', marginTop: 40}}>
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              style={{
                backgroundColor: '#708F70',
                padding: 13,
                width: '90%',
                borderRadius: 10,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '700',
                  color: '#F7F9F7',
                  fontSize: 18,
                }}>
                Register
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{paddingTop: 20}}
              onPress={() => navigation.navigate('LoginScreen')}>
              <Text
                style={{
                  color: '#A9BCB9',
                  borderBottomWidth: 1,
                  borderColor: '#A9BCB9',
                }}>
                Already have an account? Login Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
