// import { View, Text,Image, TextInput } from 'react-native'
// import React from 'react'
// import { icons } from '@/constants/icons'

// interface Props{
//         placeholder:string,
//         onPress?:()=>void
//         value?:string,
//         onChangeText?:(text:string)=>void
// }

// const Searchbar = ({onPress, placeholder,value,onChangeText}:Props) => {
//   return (
//     <View className='flex-row items-center bg-Dark-200 rounded-full px-5 py-4'>
//       <Image source={icons.search} className="w-5 h-5 " resizeMode="contain" tintColor="#FFFFFF" />
//       <TextInput 
//       onPress={onPress}
//       placeholder={placeholder}
//       value={value}
//       onChangeText={onChangeText}
//       placeholderTextColor="#FFFFFF"
//       className='flex-1 ml-2 text-white'
      
//       />
//     </View>
//   )
// }

// export default Searchbar
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { icons } from '@/constants/icons';

interface Props {
  placeholder: string;
  onPress?: () => void;               // for navigation
  value?: string;                      // for input
  onChangeText?: (text: string) => void; // for input
}

const Searchbar = ({ onPress, placeholder, value, onChangeText }: Props) => {
  // If onPress is provided, render a touchable (for home screen)
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} className="flex-row items-center bg-Dark-200 rounded-full px-5 py-4">
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#FFFFFF" />
        <Text className="flex-1 ml-2 text-white">{placeholder}</Text>
      </TouchableOpacity>
    );
  }

  // Otherwise render a text input (for search screen)
  return (
    <View className="flex-row items-center bg-Dark-200 rounded-full px-5 py-4">
      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#FFFFFF" />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#FFFFFF"
        className="flex-1 ml-2 text-white"
      />
    </View>
  );
};

export default Searchbar;