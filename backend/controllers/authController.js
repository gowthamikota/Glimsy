const User=require('../models/User');
exports.login=async(req,res)=>{
    const {nickname}=req.body;
    try {
        
        const user=await User.findOne({ nickname });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: `WELCOME AK!`, user });
    }
    catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}