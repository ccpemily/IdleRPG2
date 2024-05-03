export function toIntOrFixed1(num:number){
    let st = num.toFixed(1);
    if(st[st.length - 1] == '0' && st.length > 1 && st[st.length - 2] == '.'){
        return st.substring(0, st.length - 2);
    }
    else {
        return st;
    }
}