import "intl";

import "intl/locale-data/jsonp/en";

import { SafeAreaView, Text, TouchableOpacity, View, FlatList, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'tailwind-react-native-classnames'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectTravelTimeInfo, setDestination } from '../slices/navSlice'
import NavigationCard from './NavigationCard'

const data = [
  {
    id: 'Uber-X-123',
    title: 'Uber X',
    multiplier: 1,
    image: 'https://links.papareact.com/3pn'
  },
  {
    id: 'Uber-Xl-456',
    title: 'Uber XL',
    multiplier: 1.2,
    image: 'https://links.papareact.com/5W8'
  },
  {
    id: 'Uber-LUX-789',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: 'https://links.papareact.com/7pf'
  },
]

const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const travelTimeInfo = useSelector(selectTravelTimeInfo)

  const [isSelected, setIsSelected] = useState(null)

  return (
    <SafeAreaView style={tw`bg-white flex-grow`}>
      <View>
        <TouchableOpacity
          style={tw`z-50 absolute top-2 left-1 p-3 rounded-full`}
          onPress={() => {
            dispatch(
              setDestination({
                location: null,
                description: null
              })
            )

            navigation.navigate(NavigationCard)
          }}
        >
          <Icon name='chevron-left' type='font-awesome' />
        </TouchableOpacity>
      </View>

      <Text style={tw`border-b text-center py-4 border-gray-300 text-lg`}>
        Select a ride - {travelTimeInfo?.distance.text}
      </Text>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={
              tw`flex-row items-center justify-between px-10 border-b border-gray-100
              ${item.id === isSelected?.id && 'bg-gray-200'}`
            }
            onPress={() => setIsSelected(item)}
          >
            <Image
              style={{
                height: 90,
                width: 90,
                resizeMode: 'contain'
              }}
              source={{ uri: item.image }}
            />

            <View style={tw`-ml-6`}>
              <Text style={tw`text-lg `}>{item.title}</Text>
              <Text>{travelTimeInfo?.duration?.text}</Text>
            </View>

            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR'
              }).format(
                ((travelTimeInfo?.duration.value * SURGE_CHARGE_RATE * item?.multiplier) / 100) * 82
              )}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={tw`my-1 items-center`}
        disabled={!isSelected}
      >
        <Text style={[
          tw`bg-black py-2 w-64 text-white text-center ${!isSelected && 'bg-gray-200'}`,
          { borderRadius: 4 }
        ]}>
          Choose {isSelected?.title}
        </Text>
      </TouchableOpacity>
    </SafeAreaView >
  )
}

export default RideOptionsCard