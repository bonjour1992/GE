export function divider(size,total,number,border,offset)
{
    return {left:size/total*(number-1)+offset,width:size/total-2*border}
}