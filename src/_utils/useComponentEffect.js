import { Grow, Fade, Zoom,Slide } from '../Animate';

export default function useComponentEffects(effect){
    let Component="div";
    switch(effect){
        case "grow":
            Component=Grow;
            break;
        case "fade":
            Component=Fade;
            break;
        case "zoom":
            Component=Zoom;
            break;
        case "slide":
            Component=Slide;
            break;
        default:
            Component=Grow;
    }
    return Component;

}