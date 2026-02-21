// import { Link } from "expo-router";
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import Searchbar from "@/components/searchbar";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies, fetchTrendingMovies } from "@/services/api"; // adjust import
import MovieCard from "@/components/movieCard";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(fetchTrendingMovies); // ✅ fixed function name

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View className="flex-1 bg-primary">
      <Image className="absolute z-0 h-full w-full" source={images.bg} />
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      >
        <Image source={icons.logo} tintColor="#FFFFFF" className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {trendingMoviesLoading || moviesLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" className="mt-10 self-center" />
        ) : trendingMoviesError || moviesError ? (
          <Text className="text-white text-center mt-10">
            Error: {trendingMoviesError?.message || moviesError?.message}
          </Text>
        ) : (
          <View className="flex-1 mt-5">
            {/* Searchbar now handles onPress correctly */}
            <Searchbar
              onPress={()=>router.push("/Search")}  // ✅ works after fixing Searchbar
              placeholder="Search for movies, TV shows, genres, etc."
            />

            {trendingMovies && (
              <View className="mt-10">
                <Text className="text-lg text-bold text-white mt-5 mb-3">
                  Trending Movies
                </Text>
                {/* render trending movies here if needed */}
              </View>
            )}

            <>
              <Text className="text-white text-xl font-bold mt-5">Latest movies</Text>
              <FlatList
                data={movies}
                renderItem={({ item }) => <MovieCard {...item} />}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                columnWrapperStyle={{
                  justifyContent: 'flex-start',
                  gap: 20,
                  paddingRight: 5,
                  marginBottom: 10
                }}
                className="mt-2 pb-32"
                scrollEnabled={false}   // already inside ScrollView
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}