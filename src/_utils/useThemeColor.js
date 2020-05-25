export default function useThemeColor(color){
 
    let typeArr={
        "primary":"rgba(0,189,170,1)",
        "second":"rgba(64,0,130,1)",
        "warning":"rgba(252,227,138,1)",
        "info":"rgba(7,121,228,1)",
        "danger":"rgba(255,46,99,1)",
        "success":"rgba(107,198,0,1)"
    };

    return typeArr[color]?`${typeArr[color]}`:color

}