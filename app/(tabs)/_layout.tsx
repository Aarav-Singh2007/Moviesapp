import { View, Text, ImageBackground ,Image} from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { images } from '@/constants/images'
import { icons } from '@/constants/icons'
const TabIcon = ({focused, icon, title}:any)=>{
    if(focused){
    return(
    
          <ImageBackground source={images.gradient} className="flex flex-row  flex-1 min-w-[120px] min-h-10 size-10 items-center justify-center rounded-full overflow-hidden" >
            <Image source= {icon}
            tintColor={"#151312"} className="size-5" />
            <Text className='text-secondary test-base font-semibold ml-2'>{title}</Text>
          </ImageBackground>
    )
          
          
  }
  else{
    return(
      <Image source= {icon}
      tintColor={"#A8B5DB"} className="size-5" />
    )
  }
}



const _layout = () => {

  
  return (
    <Tabs

    screenOptions={
      {
        tabBarShowLabel: false,
        tabBarItemStyle:{
          width: 60,
          height: 40,
          borderRadius: 20,
          marginHorizontal: 10
        },
        tabBarStyle:{
          backgroundColor:"#0f0D23",
          borderRadius: 1,
        }
      }
    }
    >
        <Tabs.Screen 
         name="index" 
          options={{ 
            title:"Home",
            headerShown: false,
            tabBarIcon:({focused})=>(
              <TabIcon
              focused={focused}
              icon={icons.home}
              title ="Home" />
          
        ) }} />
        <Tabs.Screen name="Search" title="Search" options={{ headerShown: false,
           tabBarIcon:({focused})=>(
              <TabIcon
              focused={focused}
              icon={icons.search}
              title ="Search" />
          
        )
         }} />
        <Tabs.Screen name="saved" title="Saved" options={{ headerShown: false,
           tabBarIcon:({focused})=>(
              <TabIcon
              focused={focused}
              icon={icons.save}
              title ="Saved" />
          
        )
         }} />
        <Tabs.Screen name="profile" title="Profile" options={{ headerShown: false,
           tabBarIcon:({focused})=>(
              <TabIcon
              focused={focused}
              icon={icons.person}
              title ="Profile" />
          
        )
         }} />
        




    </Tabs>
  )
}

export default _layout