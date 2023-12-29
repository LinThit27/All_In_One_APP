import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type Props = {};

const CommentSection = (props: Props) => {
  return (
    <View style={{marginTop: 20, marginBottom: 90}}>
      <Text
        style={{
          color: '#15212F',

          marginVertical: 10,
        }}>
        Comments (1)
      </Text>
      <View>
        <View
          style={{
            backgroundColor: 'rgba(170, 189, 186,0.1)',
            padding: 13,
            borderRadius: 10,
            marginVertical: 6,
          }}>
          <Text style={{color: '#15212F', fontSize: 15, fontWeight: '400'}}>
            LinThit : Very Goooood
          </Text>
        </View>
        <Text
          style={{
            color: '#15212F',
            fontSize: 10,
            textAlign: 'right',
          }}>
          1 min ago
        </Text>
      </View>

      <TextInput
        style={{
          borderWidth: 1,
          borderRadius: 10,
          marginTop: 25,
          padding: 10,
          borderColor: 'rgba(21, 33, 47, 0.4)',
        }}
        placeholder="Give Your Comment"
        placeholderTextColor={'rgba(21, 33, 47, 0.3)'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 4,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#719071', padding: 10, borderRadius: 10}}>
          <Text style={{color: '#F7F9F7', fontWeight: '600'}}>Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({});
