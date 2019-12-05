const path=require('path')
const SRC_PATH=path.resolve(__dirname,"../src");

module.exports={
    entry:{
        main:"./src/index.tsx"
    },
    resolve:{
        extensions:['.js','.jsx','.ts','.tsx'],
        alias:{
            "@":path.resolve(__dirname,"../src")
        }
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx)/,
                loader:"babel-loader",
                include:SRC_PATH,
                exclude:/node_modules/
            },
            {
                test:/\.(ts|tsx)/,
                use:[
                    {
                        loader:"ts-loader",
                        options:{
                            transpileOnly:true
                        }
                    }
                ]
            }
        ]
    }
}