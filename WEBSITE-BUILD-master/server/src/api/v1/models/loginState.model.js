import mongoose from 'mongoose';

const loginStateSchema = new mongoose.Schema({
    singletonKey: { 
        type: String,
        unique: true, 
        default: 'single_instance'
    },
    isUserLoggedIn: { 
        type: Boolean,
        default: false 
    },
    isHostLoggedIn: { 
        type: Boolean,
        default: false 
    },
    isAgentLoggedIn: {
        type: Boolean, 
        default: false
    },
});

export const LoginState = mongoose.model('LoginState', loginStateSchema);

