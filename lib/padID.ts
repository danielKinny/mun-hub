import supabase from '@/lib/supabase';

async function getHighestID(table: string, col: string, idName: string,) 
{
    const { data: arr , error } = await supabase
        .from(table)
        .select(col)

    if (arr && arr.length > 0) {
    arr.sort((a, b) => a.resoID.localeCompare(b.resoID));
} // look into refactoring this

    if (error) {
        console.error('Error fetching existing resolutions:', error);
    }
    if (arr){
    const highestID = arr.length > 0 
        ? (parseInt(arr[arr.length - 1][`${idName}`]) + 1).toString().padStart(4, '0') 
        : '0001';
}
}