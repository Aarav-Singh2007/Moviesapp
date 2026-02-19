//track the serches made by the user

import { Movie } from "@/interfaces/interfaces"
import { Client,Databases,ID,Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client()
      .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); 

const database = new Databases(client);

export const updateSearchCount = async(query:string,movie:Movie) => {

    try{

    const result  = await database.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm', query)
    ])
    //check if a reced has already been stored
    if(result.documents.length>0){
        const existingMovie = result.documents[0];

        await database.updateDocument(DATABASE_ID,COLLECTION_ID,existingMovie.$id,{
            searchCount: existingMovie.searchCount + 1
        })
    }else{
        await database.createDocument(DATABASE_ID,COLLECTION_ID,ID.unique(),{
            searchTerm: query,
            movie_id: movie.id,
            count: 1,
            title: movie.title,
            poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    }
}catch(error){
    console.error("Error updating search count:", error);
}

    console.log(reasult);
    
    //if a doc is found then increment serch by feild
    // if no doc is found then create a new doc with search feild set to 1

}