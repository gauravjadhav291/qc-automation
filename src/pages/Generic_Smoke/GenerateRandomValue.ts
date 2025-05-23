export function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    console.log(`Generated random Text of ${length} length:-`, result);
    return result;
}

export function generateDate(days: number): string {
    const today = new Date(); // Get today's date
    today.setDate(today.getDate() + days); // Add days to today's date
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const generatedDate = `${day < 10 ? '0' + day : day}-${month + 1 < 10 ? '0' + (month + 1) : (month + 1)}-${year}`; // Format DD-MM-YYYY
    console.log(`Generated date (DD-MM-YYYY): ${generatedDate}`);
    return generatedDate;
} 