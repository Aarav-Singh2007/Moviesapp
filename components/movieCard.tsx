// import { View, Text, TouchableOpacity,Image } from 'react-native'
// import React from 'react'
// import { Link } from 'expo-router'
// import { Movie } from '@/interfaces/interfaces'

// const MovieCard = ({id, poster_path,title,vote_average,release_date}: Movie) => {
//   return (
//     <View>
//       <Link href={`/movie/${id}`}asChild>
//       <TouchableOpacity className="w-[30%] ">
//         <Image source ={{
//             uri: poster_path? `https://image.tmdb.org/t/p/w500${poster_path}`: 'https://via.placeholder.com/600x400?/1a1a1a/ffffff.png'
//         }}
//         className="w-full  rounded-lg"
//         style={{aspectRatio: 3/2}}
//         resizeMode='cover'
//         />
//         <Text className="text-white text-sm font-semibold mt-2">{title}</Text> 


//       </TouchableOpacity>
      
      
//       </Link>
//     </View>
//   )
// }

// export default MovieCard
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { Movie } from '@/interfaces/interfaces';
import { icons } from '@/constants/icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 32) / 3; // Adjust padding as needed

const MovieCard = ({ id, poster_path, title, vote_average, release_date }: Movie) => {
  return (
    <View>
      <Link href={`/movie/${id}`} asChild>
        <TouchableOpacity style={{ width: CARD_WIDTH }}>
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : 'https://via.placeholder.com/600x400/1a1a1a/ffffff.png',
            }}
            className="w-full rounded-lg"
            style={{ aspectRatio: 2 / 3 }}
            resizeMode="cover"
          />
          <Text className="text-white text-sm font-semibold mt-2" numberOfLines={1}>{title}</Text>
          <View className="flex-row items-center justify-start gap-x-1">
            {/* <Text className="text-white text-xs">{vote_average.toFixed(1)}</Text>
            <Text className="text-white text-xs">•</Text>
            <Text className="text-white text-xs">{release_date}</Text> */}

            <Image source={icons.star} className="w-3 h-3 bg-yellow-400 rounded-xl" />

            <Text className="text-white text-xs font-bold">{Math.round(vote_average/2)}</Text>

            <View className='flex-row items-center justify-between'>
              <Text className="text-light-300 font-medium text-xs">

                {release_date ?.split('-')[0]}
              </Text>

              {/* <Text  className='text-xs font-medium text-light-300 uppercase'>
                Movie

              </Text> */}


            </View>



          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default MovieCard;