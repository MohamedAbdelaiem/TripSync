const express=require('express');
const path=require('path');
const helmet=require('helmet');
const xss=require('xss-clean');


//Intialize Routers
const UserRouter=require('./Routes/userRouter');
const PoliciesRouter=require('./Routes/policesRouter');
const rewardsRouter=require('./Routes/RewardsRouter');
const BlogRouter=require('./Routes/BlogsRouter');


const app=express();

//api security
app.use(helmet());
app.use(xss());


//Body Parser
app.use(express.json());//for json data
app.use(express.urlencoded({extended:true}));//for form data

//Serve Static Files
// app.use(express.static(path.join(__dirname,'public')));


//Mount Routers
app.use('/api/v1/users',UserRouter);
app.use('/api/v1/policies',PoliciesRouter);
app.use('/api/v1/rewards',rewardsRouter);
app.use('/api/v1/blogs',BlogRouter);



//Error Handler
app.use((req,res,next)=>{
    res.status(404).send('Page Not Found');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

