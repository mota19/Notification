import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const Notification: React.FC = () => {
  return (
    <View style={styles.container}>
      <TextInput style={styles.input} />
      <View>
        <Text>someTexts</Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 5,
    borderRadius: 100,
    minHeight: 30,
    maxHeight: 50,
  },
});
