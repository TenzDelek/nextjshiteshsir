import mongoose from 'mongoose'

//every time a api is call the database connect should be called
export async function connect()
{
    try {
      mongoose.connect(process.env.MONGO_URL!);
      const connection=mongoose.connection;
      //every event from mongo are listen with on
      connection.on('connected',()=>{
        console.log('MONGO CONNECTED')
      })
      connection.on('error',(err)=>{
        console.log("mongo connection error",err)
        process.exit()
      })
    } catch (error) {
        console.log("something went wrong while connecting to db",error)
    }
}