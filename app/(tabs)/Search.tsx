
// import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useLocalSearchParams } from 'expo-router';
// import { images } from '@/constants/images';
// import MovieCard from '@/components/movieCard';
// import { fetchMovies } from '@/services/api';
// import useFetch from '@/services/useFetch';
// import { icons } from '@/constants/icons';
// import Searchbar from '@/components/searchbar';
// import { updateSearchCount } from '@/services/appwrite';

// const Search = () => {
//   // Get the search query from the URL params (passed from the search bar)
//   const [SearchQuery, setSearchQuery] = useState('');
//   const { SearchQuery: urlSearchQuery } = useLocalSearchParams<{ SearchQuery: string }>();

//   const {
//     data: movies,
//     loading: moviesLoading,
//     error: moviesError,
//     refetch: refetchMovies,
//     reset, 
//   } = useFetch(() => fetchMovies({ query:SearchQuery}),false);


//   useEffect(() => {
    
    
//     const setTimeoutID = setTimeout( async () => {
      
//       if(SearchQuery.trim()){
//         await refetchMovies();
//         if(movies?.[0] && movies.length > 0){
//           await updateSearchCount(SearchQuery, movies[0]);
//         }
//       } else {
//         reset();
//       }
//     }, 1500);

//     return () => clearTimeout(setTimeoutID);
    


//   }, [SearchQuery])

//   // Loading state
  
//   // No results state
  

//   // Success: render the movie grid
//   return (
//     <View className="flex-1 bg-primary">
//       {/* Background image */}
//       <Image source={images.bg} className="absolute w-full h-full" resizeMode="cover" />

//       {/* Movie list */}
//       <FlatList
//         data={movies}
//         renderItem={({ item }) => <MovieCard {...item} />}
//         keyExtractor={(item) => item.id.toString()}
//         numColumns={3}
//         columnWrapperStyle={{
//           justifyContent: 'flex-start',
//           gap: 20,
//           paddingRight: 5,
//           marginBottom: 10,
//         }}
//         className="px-5 mt-20"
//         showsVerticalScrollIndicator={false}
//         ListHeaderComponent={

//           <>
//           <View className="w-full flex-row justify-center items-center mt-20">

//             <Image source={icons.logo} className='w-12 h-10' />


//             </View>
//             <View className='my-5'>
//               <Searchbar placeholder="Search movies..."
//               value={SearchQuery}
//               onChangeText={(text: string) => setSearchQuery(text)} 
              
//               />

//             </View>
//             {moviesLoading && (
//               <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
//             )}

//             {moviesError && (
//               <Text className="text-red-500 text-center mt-10">Error loading movies: {moviesError}</Text>
//             )}

//             {!moviesLoading && !moviesError && SearchQuery.trim() && movies?.length>0 && (
//               // <Text className="text-white text-center mt-10">No movies found for "{query}"</Text>

//               <Text className='text-3xl text-clip text-white '>

//                 Search Reasults for:--
//                 <Text className='text-neutral-950 text-2xl'>
//                    { SearchQuery}
//                 </Text>
//               </Text>


//             )}
          
//           </>


//         }
//         ListEmptyComponent={
//           !moviesLoading&&!moviesError?(
//             <View className='mt-10 px-5'>
//               <Text className="text-white text-center mt-10">
//                 {SearchQuery.trim() ? `No movies found for "${SearchQuery}"` : "Start typing to search for movies!"} 
//               </Text>
              
//               </View>
//           ):null
//         }
//       />
//     </View>
//   );
// };

// export default Search;  

import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import MovieCard from '@/components/movieCard';
import { fetchMovies } from '@/services/api';
import useFetch from '@/services/useFetch';
import { icons } from '@/constants/icons';
import Searchbar from '@/components/searchbar';
import { updateSearchCount } from '@/services/appwrite';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
    refetch: refetchMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: searchQuery }), false);

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        const result = await refetchMovies();           // use returned data
        if (result?.data?.length > 0) {
          await updateSearchCount(searchQuery, result.data[0]);
        }
      } else {
        reset();
      }
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, refetchMovies, reset]); // ✅ all dependencies included

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full h-full" resizeMode="cover" />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'flex-start',
          gap: 20,
          paddingRight: 5,
          marginBottom: 10,
        }}
        className="px-5 mt-20"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center items-center mt-20">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="my-5">
              <Searchbar
                placeholder="Search movies..."
                value={searchQuery}
                onChangeText={(text: string) => setSearchQuery(text)}
              />
            </View>

            {moviesLoading && (
              <ActivityIndicator size="large" color="#0000FF" className="mt-10 self-center" />
            )}

            {moviesError && (
              <Text className="text-red-500 text-center mt-10">
                Error loading movies: {moviesError.message || String(moviesError)}
              </Text>
            )}

            {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length > 0 && (
              <Text className="text-3xl text-white">
                Search Results for: <Text className="text-neutral-400 text-2xl">{searchQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !moviesLoading && !moviesError ? (
            <View className="mt-10 px-5">
              <Text className="text-white text-center mt-10">
                {searchQuery.trim()
                  ? `No movies found for "${searchQuery}"`
                  : "Start typing to search for movies!"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;