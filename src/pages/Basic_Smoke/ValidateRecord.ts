export function validatePagnination(item: string): boolean {
    //Items per page  |    Total Pages: 1   Items: 1 
    console.log("validating pagination count.....");
    const parsedItem: number = parseInt(item.split('Items:')[1]) ||
        parseInt(item.split('found :')[1]) ||
        parseInt(item.split('Staff :')[1]) ||
        parseInt(item.split('Staffs :')[1]);

    return parsedItem > 0;
} 