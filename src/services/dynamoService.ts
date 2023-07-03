import { DynamoDBClient, PutItemCommand, ScanCommand } from '@aws-sdk/client-dynamodb';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

const identityPoolId = 'eu-central-1:917e7a03-ffaf-469d-a293-a72b95e945c0';
const region = 'eu-central-1';

const credentials = fromCognitoIdentityPool({
    clientConfig: {region},
    identityPoolId: identityPoolId,
  });
const client = new DynamoDBClient({region: region, credentials: credentials });

export interface Movie {
    title: string;
    imdbLink: string;
    rating: string;
}

export const addMovie = async(movie: Movie) => {
    const item = {
        title: {S: movie.title},
        imdbLink: {S: movie.imdbLink},
        rating: {S: movie.rating},
    }

    const command = new PutItemCommand({
        TableName: 'movies',
        Item: item,
    });

    try{
        const response = await client.send(command);
        console.log('Item saved successfully:', response);
        return true; 
    } catch (error){
      console.error('Error saving item', error);
      return false;  
    };   
}

export const getMovies = async (): Promise<Movie[]> => {
    const command = new ScanCommand({TableName: 'movies'});

    try{
        const response = await client.send(command);
        const movieItems = response.Items || [];

        const movies = movieItems.map((item: any) => ({
            title: item.title?.S || '',
            imdbLink: item.imdbLink?.S || '',
            rating: item.rating?.S || '',
        }));
        return movies; 
    } catch (error){
        console.error('Error fetching movies:', error)
        throw error;
    }
    return [];
};