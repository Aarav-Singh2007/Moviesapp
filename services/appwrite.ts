//track the serches made by the user

import { Movie } from "@/interfaces/interfaces"
import { Client,Databases,Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID;

const client = new Client();
      .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
      .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!); 

const databse = new Databases(client);

export const updateSearchCount = async(query:string,movie:Movie) => {

    const reasult  = await databse.listDocuments(DATABASE_ID,COLLECTION_ID,[
        Query.equal('searchTerm',query);
    ])
    //check if a reced has already been stored
    //if a doc is found then increment serch by feild
    // if no doc is found then create a new doc with search feild set to 1

}