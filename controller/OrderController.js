const orderService = require('../service/OrderService');
const moment = require('moment');

const getAllOrders = async (req, res, next) => {
    try {
        const {date, year, month } = req.query;
        let startDate, endDate;

        if (date==='today')
        {
            const dateForToday = new Date();
            startDate = moment(dateForToday).startOf('day').toDate();
            endDate = moment(dateForToday).endOf('day').toDate();
        }
        else if(date)
        {
            startDate = moment(date).startOf('day').toDate();
            endDate = moment(date).endOf('day').toDate();
        }
        else if(year && month !== undefined)
        {
            startDate = moment().year(year).month(month).startOf('month').toDate();
            endDate = moment().year(year).month(month).endOf('month').toDate();
        }
        else if (year)
        {
            startDate = moment().year(year).startOf('year').toDate();
            endDate = moment().year(year).endOf('year').toDate();
        }

        const orders = await orderService.
        getAllOrders(startDate,endDate);

        console.log('orders in controller ',orders)

        if(orders)
        {
            res.status(200).json(orders);
        }

    }
    catch (error)
    {
        res.status(404).json({ error: error.message });
    }
}

const createOrder = async (req, res, next) => {
    const userId = req.user.id;
    const order = req.body;

    try
    {
        const createdOrder = await orderService.createOrder(userId,order);
        console.log('created order in controller ',createdOrder);
        if(createdOrder)
        {
            return res.status(200).json(createdOrder);
        }
    }
    catch(err)
    {
        return res.status(400).json({err:err.message})
    }

}

const getOrderById = async (req, res, next) => {
    const orderId = req.params.orderId;

    try
    {
        const orderById = await orderService.getOrderById(orderId);
        console.log('order by id in controller ',orderById);
        if(orderById)
        {
            return res.status(200).json(orderById);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message})
    }
}

// const getDailyOrders = async (req, res, next) => {
//    // if(req.params.date === 'today')
//    // {
//    //     try
//    //     {
//    //         const date = new Date();
//    //         const year = date.getFullYear();
//    //         const month = String(date.getMonth() + 1).padStart(2, '0');
//    //         const day = String(date.getDate()).padStart(2, '0');
//    //
//    //         const dateForUse = `${year}-${month}-${day}`;
//    //         console.log('date for use ',dateForUse);
//    //
//    //         const dailyOrders = await orderService.getDailyOrders(dateForUse);
//    //         console.log('daily orders in controller ',dailyOrders);
//    //         if(dailyOrders)
//    //         {
//    //             return res.status(200).json(dailyOrders)
//    //         }
//    //     }
//
//         try
//         {
//             let date = req.params.date;
//             console.log('date in controller ',date)
//             if(date)
//             {
//                 date === 'today' ? date = new Date(): date;
//                 const dayStart = moment(date).startOf('day').toDate();
//                 const dayEnd = moment(date).endOf('day').toDate();
//
//                 console.log('date in controller ',date);
//                 console.log('day start in controller ',dayStart);
//                 console.log('day end in controller ',dayEnd);
//
//                 const dailyOrders = await orderService.getDailyOrders(dayStart,dayEnd);
//                 console.log('daily orders in controller ',dailyOrders);
//                 return  res.status(200).json(dailyOrders);
//             }
//
//             // else if(date)
//             // {
//             //     const dayStart = moment(date).startOf('day').toDate();
//             //     const dayEnd = moment(date).endOf('day').toDate();
//             //
//             //     console.log('date in controller ',date);
//             //     console.log('day start in controller ',dayStart);
//             //     console.log('day end in controller ',dayEnd);
//             //
//             //     const dailyOrders = await orderService.getDailyOrders(dayStart,dayEnd);
//             //     console.log('daily orders in controller ',dailyOrders);
//             //     return  res.status(200).json(dailyOrders);
//             // }
//
//         }
//        catch(err)
//        {
//            return res.status(404).json({err:err.message})
//        }
//
// }

// const getMonthlyAndYearlyOrders = async (req,res,next) => {
//     try {
//         const {date, year, month } = req.query;
//         let startDate, endDate;
//
//         if (date==='today') {
//             const dateForToday = new Date();
//             startDate = moment(dateForToday).startOf('day').toDate();
//             endDate = moment(dateForToday).endOf('day').toDate();
//         }
//         else if(date){
//
//             startDate = moment(date).startOf('day').toDate();
//             endDate = moment(date).endOf('day').toDate();
//         }
//         else if (year && month !== undefined) {
//
//             startDate = moment().year(year).month(month).startOf('month').toDate();
//             endDate = moment().year(year).month(month).endOf('month').toDate();
//         } else if (year) {
//
//             startDate = moment().year(year).startOf('year').toDate();
//             endDate = moment().year(year).endOf('year').toDate();
//         }
//
//         const monthlyAndYearlyOrders = await orderService.
//         getMonthlyAndYearlyOrders(startDate,endDate);
//         console.log('monthly and yearly orders in controller ',monthlyAndYearlyOrders)
//
//         res.status(200).json(monthlyAndYearlyOrders);
//     } catch (error) {
//         res.status(404).json({ error: error.message });
//     }
// }

module.exports = {getAllOrders,createOrder,getOrderById}