import schedule from 'node-schedule';
import {Offer} from '../models/offer.model.js';
import { ApiError } from '../../../utils/ApiError.js';

try {

    const job = schedule.scheduleJob('* * * * *', async function() {
        const now = new Date();
        // console.log('Current time:', now);np
        const updateOffer = await Offer.updateMany(
          { expiryDate: { $lt: now }, offerStatus: 'pending' },
          { $set: { offerStatus: 'expired', isExpired: true } }
      );
        //const offer = await Offer.find({});
//console.log("offer",offer);
        // console.log('Expired offers updated',updateOffer);
      });
    
} catch (error) {
    throw new ApiError(500, 'Somthing went wrong while setting offer to expired');
}


