const mongoose= require('mongoose')

// const DB = "mongodb+srv://areeb:madnimunna@cluster0.s4p96.mongodb.net/mernstack1?retryWrites=true&w=majority"
const DB = process.env.DATABASE;

mongoose.connect(DB, 
    
    // Deprication Warning

//     {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false

// }

).then(()=>{
    console.log(`connection successfull`)
}).catch((err)=>
    console.log(err)
)