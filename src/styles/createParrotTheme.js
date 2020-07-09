
import { deepmerge } from '../_utils/deepmerge';

import transitions from './transitions';

function createParrotTheme(options={},...args){
    const {
        ...other
    }=options;

    let parrotTheme=deepmerge(
        {transitions},other
    );

    parrotTheme=args.reduce((acc,argument)=>deepmerge(acc,argument),parrotTheme);

    return parrotTheme;
}

export default createParrotTheme;