import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const hostSchema = new Schema({
    agentId: {
        type: Schema.Types.ObjectId,
        ref: "Agent"
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowecase: true,
        index: true
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    phoneVerified: {
        type: Boolean,
        default: false,
    },
    backupPhoneNumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    hostStatus: {
        type: String,
        Enum: ["Callback","Paid","Language Barrier","Not Interested", "DND", "Not Connected", "Ok to send offer" ],
    },
    statusReason: {
        type: String,
        Enum: ["Budget", "Salesman pushy", "High Price", "Fully booked", "Simply Not Interested", "Wants Free Trial", "Website Feedback", "Paid Customer", "Invalid Number", "Wrong Number", "Phone Not Reachable", "Answering Machine", "Language Barrier", "want to talk later"],
    },
    work: {
        type: String,
    },
    company: {
        type: String,
        Enum: ["owner", "manager", "agency"],
    },
    timeZone: {
        type: String,
    },
    languages: {
        type: String,
    },
    about: {
        type: String
    },
    isHost: {
        type: Boolean,
        default: false
    },
    lastLogoutTime: {
        type: Date,
        default: null,
    },
    propertyURL: {
        type: String,
    },
    callBackTime: {
        type: Date,
    },
},{
        timestamps: true
    });

hostSchema.pre("save", async function(next){
    console.log("hashing host's password: ",this.password);
    if(!this.isModified("password")) return next();


    this.password = await bcrypt.hash(this.password,10)
    next();
})

hostSchema.methods.isPasswordCorrect = async function(password){
    console.log("password",password,this.password);
    return await bcrypt.compare(password, this.password)
}

hostSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            firstname: this.firstname,
            lastname: this.lastname
        },
        process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

hostSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
)}

hostSchema.pre('findOneAndDelete', async function(next) {
    try{
        const Listing = mongoose.model('Listing');
        console.log("pre remove Reservation of host:", Listing, this.getQuery()); 
        await Listing.deleteMany({ hostId: this.getQuery()['_id'] });
        next();    

    }catch(error){
        console.log("Error:", error);
    }
});

export const Host = mongoose.model("Host",hostSchema)
