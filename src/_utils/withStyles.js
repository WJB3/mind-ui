function withStyles(stylesOrCreator,options){
    return withStylesWithoutDefault(stylesOrCreator,{
        defaultTheme,
        ...options
    })
}