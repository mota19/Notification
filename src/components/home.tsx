import React from 'react';
import Notification from './notification';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const Home: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{title: 'Notification'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Home;
