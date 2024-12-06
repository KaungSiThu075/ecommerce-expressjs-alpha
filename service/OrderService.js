const Order = require('../model/Order');
const Cart = require('../model/Cart');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;

const getAllOrders = async (dayStart,dayEnd) => {
    const orders = await Order.find({createdAt:{$gte:dayStart,$lt:dayEnd}});
    console.log('daily orders in service ',orders);
    if(orders.length)
    {
        return orders;
    }
    else
    {
        return [];
    }
}

const createOrder = async (userId,order) => {
    const newOrder = new Order({
        userId: new objectId(userId),
        cart:order.cart,
        payment:order.payment,
        totalOrderQuantity:order.totalQuantityInCart,
        totalOrderAmount:order.totalPriceInCart,
    });

    const savedOrder = await newOrder.save();
    console.log('saved order in service ',savedOrder);

    if(savedOrder)
    {
        const deletedCart = await Cart.findOneAndDelete({userId});
        console.log('deleted cart in service ',deletedCart);

        return savedOrder;
    }

}

const getOrderById = async (orderId) => {
    const orderById = await Order.findById(orderId);
    if(!orderById)
    {
        throw new Error(`can't find order`)
    }
    return orderById;
}

// const getDailyOrders = async (dayStart,dayEnd) => {
//    const dailyOrders = await Order.find({createdAt:{$gte:dayStart,$lt:dayEnd}});
//    console.log('daily orders in service ',dailyOrders);
//    if(dailyOrders)
//    {
//        return dailyOrders;
//    }
// }
//
// const getMonthlyAndYearlyOrders = async (dayStart,dayEnd) => {
//     const monthlyAndYearlyOrders = await Order.find({createdAt:{$gte:dayStart,$lt:dayEnd}});
//     console.log('monthly and yearly orders in service ',monthlyAndYearlyOrders);
//     if(monthlyAndYearlyOrders)
//     {
//         return monthlyAndYearlyOrders;
//     }
// }

module.exports = {getAllOrders,createOrder,getOrderById}