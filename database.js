import mongoose  from 'mongoose'

// ahmedimran96yoo@gmail.com


const mongouri ="mongodb+srv://ranaDatabase:ahmedimran96yoo@cluster0.xer9vl6.mongodb.net/bumpData?retryWrites=true&w=majority"
// const mongouri ="mongodb+srv://ranaDatabase:ahmedimran96yoo@cluster0.cek8cx4.mongodb.net/newDatabase?retryWrites=true&w=majority"
// const mongouri = "mongodb+srv://ranaDatabase:ahmedimran96yoo@cluster0.cek8cx4.mongodb.net/firstDatabaseretryWrites=true&w=majority"
const connectDB = () => {

    mongoose.connect(mongouri
    ).then((result) => {
        console.log('mongo connected');
    })
        .catch((err) => { console.log(err) });
}

export default connectDB
