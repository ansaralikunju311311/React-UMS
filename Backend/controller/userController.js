import User from "../model/userModel.js"
import bcrypt from 'bcrypt'
const signup =async (req,res)=>
{
    try {
        const {username,email,password} = req.body;
        // console.log(req.body);

        const userExist = await User.findOne({email});
        if(userExist)   
            {
                // alert('the user is exist')
                return res.status(400).json('the user is already exist');
            } 

            const salt = await bcrypt.genSalt(10);
            const hashpassword= await bcrypt.hash(password,salt);
    
            const newuser = new User({email,password:hashpassword,username});
            await newuser.save();
            res.status(200).json('the register is succesfully createed')

    } catch (error) {
        console.log(error);
        res.status(400).json('something error happend')
    }
   
}
const login = async (req,res)=>
{
    const {email,password} = req.body;
    // console.log('login',req.body)
    try {
        const user = await User.findOne({email})
        console.log('fordebug',user)
        if(!user) 
            {
                return res.status(400).json('the user is not exist here')
            }
      
        const isPassword = await bcrypt.compare(password,user.password)
        if(!isPassword){
            return res.status(400).json('the password is not match')
        } 
        
      res.status(200).json('the login is success')
    } catch (error) {
        console.log(error)
    }
}
export {signup,login}