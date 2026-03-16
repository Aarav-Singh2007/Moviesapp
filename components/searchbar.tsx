--- a/searchbar.tsx
+++ b/searchbar.tsx
@@ -1,49 +1,47 @@
-// import { View, Text,Image, TextInput } from 'react-native'

-// import React from 'react'

-// import { icons } from '@/constants/icons'

-

-// interface Props{

-//         placeholder:string,

-//         onPress?:()=>void

-//         value?:string,

-//         onChangeText?:(text:string)=>void

-// }

-

-// const Searchbar = ({onPress, placeholder,value,onChangeText}:Props) => {

-//   return (

-//     <View className='flex-row items-center bg-Dark-200 rounded-full px-5 py-4'>

-//       <Image source={icons.search} className="w-5 h-5 " resizeMode="contain" tintColor="#FFFFFF" />

-//       <TextInput 

-//       onPress={onPress}

-//       placeholder={placeholder}

-//       value={value}

-//       onChangeText={onChangeText}

-//       placeholderTextColor="#FFFFFF"

-//       className='flex-1 ml-2 text-white'

-      

-//       />

-//     </View>

-//   )

-// }

-

-// export default Searchbar

+// Import necessary components from react-native

 import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';

 import React from 'react';

 import { icons } from '@/constants/icons';

 

+// Define the props interface for the Searchbar component

 interface Props {

+  /**

+   * The placeholder text to display in the search bar

+   */

   placeholder: string;

-  onPress?: () => void;               // for navigation

-  value?: string;                      // for input

-  onChangeText?: (text: string) => void; // for input

+  /**

+   * An optional callback function to handle press events

+   */

+  onPress?: () => void;

+  /**

+   * The current value of the search bar

+   */

+  value?: string;

+  /**

+   * An optional callback function to handle text changes

+   */

+  onChangeText?: (text: string) => void;

 }

 

+/**

+ * A reusable search bar component that can be used for both navigation and search input

+ * @param props The props for the Searchbar component

+ * @returns The Searchbar component

+ */

 const Searchbar = ({ onPress, placeholder, value, onChangeText }: Props) => {

   // If onPress is provided, render a touchable (for home screen)

   if (onPress) {

     return (

-      <TouchableOpacity onPress={onPress} className="flex-row items-center bg-Dark-200 rounded-full px-5 py-4">

-        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#FFFFFF" />

+      <TouchableOpacity

+        onPress={onPress}

+        className="flex-row items-center bg-Dark-200 rounded-full px-5 py-4"

+      >

+        <Image

+          source={icons.search}

+          className="w-5 h-5"

+          resizeMode="contain"

+          tintColor="#FFFFFF"

+        />

         <Text className="flex-1 ml-2 text-white">{placeholder}</Text>

       </TouchableOpacity>

     );

@@ -52,7 +50,12 @@
   // Otherwise render a text input (for search screen)

   return (

     <View className="flex-row items-center bg-Dark-200 rounded-full px-5 py-4">

-      <Image source={icons.search} className="w-5 h-5" resizeMode="contain" tintColor="#FFFFFF" />

+      <Image

+        source={icons.search}

+        className="w-5 h-5"

+        resizeMode="contain"

+        tintColor="#FFFFFF"

+      />

       <TextInput

         placeholder={placeholder}

         value={value}
