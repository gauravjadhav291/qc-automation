export function ValidateAttachment(item1: string, item2: string): boolean { 
    const beforecount: number = parseInt(item1.split('Items:')[1]) || (parseInt(item1.split('found :')[1])) || (parseInt(item1.split('Staff :')[1])) || (parseInt(item1.split('Staffs :')[1]))
    const aftercount: number = parseInt(item2.split('Items:')[1]) || (parseInt(item2.split('found :')[1])) || (parseInt(item2.split('Staff :')[1])) || (parseInt(item2.split('Staffs :')[1]))
 
    const afterAttach: number = (parseInt(beforecount.toString()) + 1)
 
    if (aftercount === afterAttach) {
       return true
    }
    else {
       return false
    }
} 