import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_MAPS_API } from '@env'
import { useNavigation } from '@react-navigation/native';
import { setDestination } from '../slices/navSlice'
import { useDispatch } from 'react-redux'
import RideOptionsCard from './RideOptionsCard'

const NavigationCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-xl py-4 text-center`}>YO! Pick a drop location</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <GooglePlacesAutocomplete
          placeholder='Where to?'
          styles={toInputBoxStyles}
          nearbyPlacesAPI='GooglePlacesSearch'
          fetchDetails={true}
          enablePoweredByContainer={false}
          returnKeyType={"search"}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_API,
            language: 'en'
          }}
          onPress={(data, details = false) => {
            dispatch(
              setDestination({
                location: details.geometry.location,
                description: data.description
              })
            )

            navigation.navigate(RideOptionsCard)
          }}
          debounce={400}
        />
      </View>
    </SafeAreaView>
  )
}

export default NavigationCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    paddingTop: 15,
    flex: 0
  },
  textInput: {
    backgroundColor: '#dddddf',
    borderRadius: 4,
    fontSize: 18
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0
  }
})