import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '../components/Map'
import NavigationCard from '../components/NavigationCard'
import RideOptionsCard from '../components/RideOptionsCard'
import tw from 'tailwind-react-native-classnames'
import MapView from 'react-native-maps';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';

const MapScreen = () => {
  const Stack = createNativeStackNavigator()
  return (
    <View>
      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name='NavigationCard'
            component={NavigationCard}
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name='RideOptionsCard'
            component={RideOptionsCard}
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </View>
    </View>
  )
}

export default MapScreen

const styles = StyleSheet.create({})