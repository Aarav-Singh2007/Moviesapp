

import { Movie, TrendingMovie } from "@/interfaces/interfaces";
import { Client, Databases, ID, Query } from "react-native-appwrite";

// Environment variables – ensure these match your .env file exactly (including the "W" in APPWRITE)
const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const ENDPOINT = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    // Check if a document with this searchTerm already exists
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      // Update existing document: increment searchCount
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        {
          searchCount: existingMovie.searchCount + 1,
        }
      );
    } else {
      // Create new document
      await database.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          searchCount: 1,
          // Use the exact attribute name from your collection – if it's "tittle", change this line to:
          // tittle: movie.title,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }

    console.log("Search count updated successfully for:", query);
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getSearchCounts = async(): Promise<TrendingMovie[ ]|undefined> =>{

    try{
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
        Query.orderDesc("count"),
    ])
        return result.documents as unknown as TrendingMovie[];



    }catch(error){
        console.error("Error fetching search counts:", error);
        return undefined;
    }
}