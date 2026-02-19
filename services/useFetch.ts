// import { useEffect, useState } from "react"

// const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {

//     const [data, setdata] = useState<T | null>(null)
//     const [loading, setloading] = useState(false)
//     const [error, seterror] = useState<Error | null>(null);

//     const fetchData = async()=>{
//         try{
//             setloading(true);
//             seterror(null);
//             const reasult = await fetchFunction();
//             setdata(reasult);

//         }catch(err){
//             seterror(err instanceof Error ? err : new Error('An unknown error occurred'));
//         }finally{
//             setloading(false)
//         }

//         const reset = ()=>{
//             setdata(null);
//             seterror(null);
//             setloading(false);
//         }

//         useEffect(()=>{
//             if(autoFetch){
//                 fetchData();
//             }
//         },[]);
        
        
//         return { data, loading, error, refetch: fetchData, reset }
//     }
    
    
    
// }
// export default useFetch 
import { useEffect, useState } from "react";

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await fetchFunction();
            setData(result);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('An unknown error occurred'));
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    };

    useEffect(() => {
        if (autoFetch) {
            fetchData();
        }
    }, []); // Add fetchFunction to dependencies if it can change, but usually stable

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;