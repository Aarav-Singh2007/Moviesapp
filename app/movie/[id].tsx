
import { View, Text, ScrollView, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import useFetch from '@/services/useFetch';
import { fetchMovieDetails } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps {
  lable: string;
  value: string | number| null;
}

const MovieInfo= ({lable, value}:MovieInfoProps)=>(
  <View className='flex-col   mt-5'>
    <Text className='text-light-200 text-sm font-light '>{lable}</Text>
    <Text className='text-light-100 text-sm font-light ml-2'>{value||'N/A'}</Text>
  </View>
)

const MovieDetails = () => {  

  const { id } = useLocalSearchParams();
  

  const { data: movie, loading } = useFetch(() => fetchMovieDetails(id as string));


  if (loading) {
    return (
      <View className='bg-primary flex-1 justify-center items-center'>
        <Text className='text-white'>Loading...</Text>
      </View>
    );
  }

  
  if (!movie) {
    return (
      <View className='bg-primary flex-1 justify-center items-center'>
        <Text className='text-white'>No movie data found</Text>
      </View>
    );
  }

  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{ padding: 20 }}> 
        <View>
          <Image 
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }} 
            className='w-full h-[550px]' 
            resizeMode='cover' 
          />
          <Text className='text-white text-2xl font-bold mt-4'>{movie.title}</Text>
          <Text className='text-white text-lg font-light mt-4'>{movie.release_date} {movie.runtime} minutes</Text>
          <View className=' flex-row items-center bg-gray-700  rounded-md gap-x-1'>
          <Text className='text-white text-lg font-light mt-4'>
            <Image source={icons.star}  className='w-5 bg-yellow-400 rounded-lg h-5' /> {Math.round(movie?.vote_average??0 * 10)}/10

            ({movie.vote_count} votes)
          </Text>
          </View>

          <MovieInfo lable="Overview" value={movie.overview} />
          <MovieInfo lable="Genre" value={movie.genres?.map((g: any) => g.name).join(', ')} />
          
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails; 