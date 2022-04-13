import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'tailwind-react-native-classnames';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectOrigin } from '../slices/navSlice';

const data = [
  {
    id: '123',
    name: 'Get a ride',
    image: 'https://links.papareact.com/3pn',
    screen: 'MapScreen'
  },
  {
    id: '456',
    name: 'Order food',
    image: 'https://links.papareact.com/28w',
    screen: 'EatsScreen'
  },
]

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin)

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={data}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate(item.screen)}
            style={[
              tw`p-2 pl-6 pb-6 pt-4 bg-gray-200 m-2 w-40`,
              {
                borderRadius: 8
              }
            ]}
            disabled={!origin}
          >
            <View style={tw`${!origin && 'opacity-20'}`}>
              <Image
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
                source={{ uri: item.image }}
              />
              <Text style={tw`mt-2 text-lg font-semibold`}>{item.name}</Text>
              <Icon
                style={tw`p-2 rounded-full bg-black w-10 mt-2`}
                type='antdesign'
                name='arrowright'
                color='white'
              />
            </View>
          </TouchableOpacity>
        )
        }
      />
    </View >
  )
}

export default NavOptions