//if your app is i productio (i.e. Heroku), check productio env vars
if(process.env.NODE_ENV == "production" ){
    module.exports = require( './keys_prod' )

//othwewise, if your app is ruig i workig (your laptop), check working eviromet
}else{
    module.exports = require( './keys_work' )
}