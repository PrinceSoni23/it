import { ApiError } from "../../../../utils/ApiError.js";
import { ApiResponse } from "../../../../utils/ApiResponse.js";
import { asyncHandler } from "../../../../utils/asyncHandler.js";
import { Reservation } from "../../models/host/reservation.model.js";
import { User } from "../../models/user.model.js";
import { Listing } from "../../models/host/listing.model.js";
import mongoose from "mongoose";
import { Host } from "../../models/host/host.model.js";
import { sendingMail } from "../../../../utils/SendMail.js";

// Function to format date
const formatDate = (isoDateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(isoDateString));
  };
  

const createReservation = asyncHandler( async(req, res) => {
    const {listId} = req.params;
    const userId = req.user._id;
    const {checkIn, checkOut} = req.body;
   // console.log("userId:", userId);
    const user = await User.findById(userId);

    if(!user || !listId){
        throw new ApiError(401, "Unauthorized request")
    }
    const list = await Listing.findById(listId);
    if(!list){
        throw new ApiError(404, "Listing not found")
    }
    if(!(checkIn||checkOut)){
        throw new ApiError(401, "Please provide a check in and check out time")
    }
    if(checkIn >= checkOut){
        throw new ApiError(400, "Check out time must be greater than check in time")
    }

    // write a condition to check if the check in and check out time is available using mongoose queries 

    const reservation = await Reservation.find({
        listId,
        status: "approved",
        $or: [
            {checkIn: {$gte: checkIn, $lte: checkOut}},
            {checkOut: {$gte: checkIn, $lte: checkOut}},
            {checkIn: {$lte: checkIn}, checkOut: {$gte: checkOut}}
        ]
    })
   // console.log("Reservation:", reservation);
    if(reservation.length>0){
        throw new ApiError(400, "The listing is already reserved for the selected time")
    }

    try{
        const reservation = await Reservation.create({
            listId,
            userId,
            checkIn,
            checkOut
        })
        if(reservation){
            //console.log("status",reservation.status);
            const listing = await Listing.findById(listId);
            const host = await Host.findById(listing.hostId);

            const formattedCheckIn = formatDate(checkIn);
            const formattedCheckOut = formatDate(checkOut);

            const hostMailContent =`
                                    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; background-color: #f4f4f4;">
                                        <h2 style="color: #1d3557;">Booking Confirmation Request</h2>
                                        <p>Dear ${host.firstName} ${host.lastName},</p>
                                        <p>We hope you're doing well. A user, <strong>${user.firstName} ${user.lastName}</strong>, is interested in booking your property, <strong>${listing.title}</strong>.</p>
                                        
                                        <p>Here are the details of the requested booking:</p>
                                        <ul style="list-style-type: none; padding: 0;">
                                        <li><strong>Check-in Date:</strong> ${formattedCheckIn}</li>
                                        <li><strong>Check-out Date:</strong> ${formattedCheckOut}</li>
                                        </ul>

                                        <p>Please confirm this booking at your earliest convenience by clicking the button below:</p>
                                        
                                        <p style="text-align: center;">
                                            <a href="${process.env.FRONTEND_URL}/verify-booking/${reservation._id}?status=approved" 
                                                style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #1d3557; text-decoration: none; border-radius: 5px;">
                                                Approve Booking
                                            </a>
                                            <a href="${process.env.FRONTEND_URL}/verify-booking/${reservation._id}?status=rejected" 
                                                style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #e63946; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                Reject Booking
                                            </a>
                                        </p>

                                        <p>If you have any questions or need further information, feel free to reach out to us.</p>
                                        <p>We look forward to your response!</p>
                                        
                                        <p>Best regards,</p>
                                        <p><strong>The Trip It Today Team</strong></p>
                                        <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
                                        <p style="font-size: 12px; color: #888;">You are receiving this email because your property is listed on Trip It Today. If you did not expect this, please ignore this email.</p>
                                    </div>
                                    `


            const userMailContent = `<div style="font-family: Arial, sans-serif;">
                                        <h2>Booking Request Sent</h2>
                                        <p>Dear ${user.firstName} ${user.lastName},</p>
                                        <p>Your reservation request for "${listing.title}" has been sent successfully.</p>
                                        <p>Check-in: ${formattedCheckIn}</p>
                                        <p>Check-out: ${formattedCheckOut}</p>
                                        <p> you can keep checking your booking status by clicking the button below:</p>
                                        <a href="${process.env.FRONTEND_URL}/${user._id}/trips" 
                                                style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #e63946; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                Visit Trips
                                            </a>
                                    </div>`;

            sendingMail(host.email,hostMailContent,"host","Booking Confirmation Request");
            sendingMail(user.email,userMailContent,"user","Booking Request Sent");

            const data = {_id: reservation._id, listId, checkIn, checkOut, status: reservation.status, listing}
            return res.status(200).json(
                new ApiResponse(200, data , "Reservation made succesfully")
            )
        }
    }catch(error){
        console.log("Error:",error);
        throw new ApiError(400, error.message || "Something went wrong while creating a reservation")
    }

})

const updateReservationStatus = asyncHandler( async(req, res) => {
    const {id} = req.params;
    const {status} = req.body;
  //  console.log("booking status:",status, "id:",id);
    if(!id || !status){
        throw new ApiError(400, "Please provide a valid reservation id and status")
    }
    const reservation = await Reservation.findById(id);
    if(!reservation){
        throw new ApiError(404, "Reservation not found")
    }
    if(reservation.status!="pending"){
        throw new ApiError(400, `That booking has already been ${reservation.status}`);
    }
    const alredyReserved = await Reservation.find({
        listId: reservation.listId,
        status: "approved",
        $or: [
            {checkIn: {$gte: reservation.checkIn, $lte: reservation.checkOut}},
            {checkOut: {$gte: reservation.checkIn, $lte: reservation.checkOut}},
            {checkIn: {$lte: reservation.checkIn}, checkOut: {$gte: reservation.checkOut}}
        ]
    })
    console.log("alreadyReserved:", alredyReserved);
    if(alredyReserved.length>0){
        throw new ApiError(400, "The listing is already reserved for the selected time")
    }
        
    try{
        reservation.status = status;
        await reservation.save();
        console.log("reservation:",reservation);
        if(reservation){
           // console.log("userId",reservation.userId);
            const user = await User.findById(reservation.userId);
            const listing = await Listing.findById(reservation.listId);
            const host = await Host.findById(listing.hostId);
            if(!user || !listing || !host){
                throw new ApiError(400, "User, listing or host something was not found for sending email of booking confirmation")
            }

            const formattedCheckIn = formatDate(reservation.checkIn);
            const formattedCheckOut = formatDate(reservation.checkOut);
            let userMailContent, hostMailContent, subject;
            if(status === "approved"){
                        subject = "Booking Request Approved";
                        hostMailContent = `<div style="font-family: Arial, sans-serif;">
                                                <h2>Booking Request Approved</h2>
                                                <p>Dear ${host.firstName} ${host.lastName},</p>
                                                <p>You have successfully approved a reservation request for your listing: "${listing.title}".</p>
                                                <p>Guest: ${user.firstName} ${user.lastName}</p>
                                                <p>Check-in: ${formattedCheckIn}</p>
                                                <p>Check-out: ${formattedCheckOut}</p>
                                                <p>You can review the details of this booking by clicking the button below:</p>
                                                <a href="${process.env.FRONTEND_URL}/${host._id}/properties" 
                                                    style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #2a9d8f; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                    View Booking
                                                </a>
                                            </div>`;

                        userMailContent = `<div style="font-family: Arial, sans-serif;">
                                                <h2>Booking Request Confirmed</h2>
                                                <p>Dear ${user.firstName} ${user.lastName},</p>
                                                <p>Your reservation request for "${listing.title}" has been confirmed.</p>
                                                <p>Check-in: ${formattedCheckIn}</p>
                                                <p>Check-out: ${formattedCheckOut}</p>
                                                <p> Have a happy and safe journey. You can check your booking status by clicking the button below:</p>
                                                <a href="${process.env.FRONTEND_URL}/${user._id}/trips" 
                                                    style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #e63946; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                    Visit Trips
                                                </a>
                                            </div>`;

            }else if(status === "rejected"){
                        subject = "Booking Request Rejected";
                        hostMailContent = `<div style="font-family: Arial, sans-serif;">
                                                <h2>Booking Request Rejected</h2>
                                                <p>Dear ${host.firstName} ${host.lastName},</p>
                                                <p>You have rejected a reservation request for your listing: "${listing.title}".</p>
                                                <p>Guest: ${user.firstName} ${user.lastName}</p>
                                                <p>Check-in: ${formattedCheckIn}</p>
                                                <p>Check-out: ${formattedCheckOut}</p>
                                                <p>If you would like to review other pending requests or manage your listings, click the button below:</p>
                                                <a href="${process.env.FRONTEND_URL}/${host._id}/properties" 
                                                    style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #e63946; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                    Manage Listings
                                                </a>
                                            </div>`;

                        userMailContent = `<div style="font-family: Arial, sans-serif;">
                                                <h2>Booking Request Rejected</h2>
                                                <p>Dear ${user.firstName} ${user.lastName},</p>
                                                <p>Your reservation request for "${listing.title}" has been rejected.</p>
                                                <p>Check-in: ${formattedCheckIn}</p>
                                                <p>Check-out: ${formattedCheckOut}</p>
                                                <p> You can check your booking status by clicking the button below:</p>
                                                <a href="${process.env.FRONTEND_URL}/${user._id}/trips" 
                                                    style="display: inline-block; padding: 12px 24px; font-size: 16px; color: white; background-color: #e63946; text-decoration: none; border-radius: 5px; margin-left: 10px;">
                                                    Visit Trips
                                                </a>
                                            </div>`;
            }
            sendingMail(host.email,hostMailContent,"host",subject);
            sendingMail(user.email,userMailContent,"user",subject);
            return res.status(200).json(
                new ApiResponse(200, reservation, "Reservation status updated successfully")
            )
        }
    }catch(error){
        throw new ApiError(400, "Something went wrong while updating the reservation status")
    }
})

const getReservations = asyncHandler( async(req, res) => {
    const {listId} = req.params;
    const reservations = await Reservation.find({listId})
    return res.status(200).json(
        new ApiResponse(200, reservations, "Reservations fetched successfully")
    )
})

const getReservationsForHost = asyncHandler( async(req, res) => {

    try {
        const hostId = req.hostData._id;
        //console.log("reservation for host, hostId:", hostId);
        const reservations = await Reservation.aggregate([
            {
                // Step 1: Find the listings of the given host
                $lookup: {
                  from: "listings", // The collection name for listings
                  localField: "listId", // The field in the reservations collection
                  foreignField: "_id", // The field in the listings collection
                  as: "listingDetails",
                },
              },
              {
                // Step 2: Unwind the listingDetails array
                $unwind: "$listingDetails",
              },
              {
                // Step 3: Match listings that belong to the specific host
                $match: {
                  "listingDetails.hostId": hostId,
                },
              },
              {
                // Step 4: Join with users collection to fetch user details
        $lookup: {
            from: "users", // The users collection name
            localField: "userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          // Step 5: Unwind the userDetails array
          $unwind: "$userDetails",
        },
        {
          // Step 6: Project only necessary fields
          $project: {
            listingDetails: 1,  // Include listing details in the output
            userDetails: 1, // Include user details in the output
            checkIn: 1,
            checkOut: 1,
            status: 1,
          },
              },
            ]);
        res.status(200).json(
            new ApiResponse(200, reservations, "Reservations fetched successfully")
        )
        //console.log("reservations for host",reservations);
    
    } catch (error) {
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while fetching reservations");
        
    }
        
})

const deleteReservation = asyncHandler( async(req, res) => {
    const{id} = req.params;
    const userId = req.user._id;
    if(!id){
        throw new ApiError(400, "Please provide a valid reservation id")
    }
    try{
        await Reservation.findByIdAndDelete(id)
        const remainingReservationsWithListings = await Reservation.aggregate([
            { 
                $match: { 
                    userId: new mongoose.Types.ObjectId(userId)              // Match reservations for the user
                } 
            }, 
            {
                $lookup: {
                    from: 'listings', // Name of the listings collection
                    localField: 'listId', // Field in reservations
                    foreignField: '_id', // Field in listings
                    as: 'listing' // Output array field
                }
            },
            { 
                $unwind: '$listing'           // Flatten the array
            }, 
            {
                $project: {
                    _id: 1,
                    listId: 1,
                    checkIn: 1,
                    checkOut: 1, // Include other reservation fields if needed
                    listing: {
                        title: 1,
                        city: 1,
                        country: 1,
                        province: 1,
                        listingPhotoPaths: 1,
                        price: 1,
                        hostId: 1,
                        category: 1 // Include other listing fields if needed
                    }
                }
            }
            ]);
        res.status(200).json(
            new ApiResponse(200, remainingReservationsWithListings, "Reservation cancelled successfully")
        )
    }catch(error){
        console.log("Error: ",error);
        throw new ApiError(400, "Something went wrong while cancelling the reservation")
    }
})

export {
    createReservation,
    updateReservationStatus,
    getReservations,
    getReservationsForHost,
    deleteReservation
}