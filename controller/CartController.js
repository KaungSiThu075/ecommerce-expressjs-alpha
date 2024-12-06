const cartService = require('../service/CartService');

const getCartByUserId = async (req, res, next) => {
    const userId = req.user.id;

    try
    {
        const cart = await cartService.getCartByUserId(userId);
        console.log('cart by user id in controller ',cart);

        if(cart)
        {
            return res.status(200).json(cart);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

const createCart = async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.body.product;
    const size = req.body.size;

    try
    {
        const cart = await cartService.createCart(userId,productId,size);
        console.log('cart in controller ',cart);
        if(cart)
        {
            return res.status(201).json(cart);
        }
    }
    catch(err)
    {
        return res.status(400).json({err:err.message});
    }
}

const removeFromCart = async (req, res, next) => {
    const userId = req.user.id;
    const productId = req.body.product;
    const size = req.body.size;

    try
    {
        const cart = await cartService.removeFromCart(userId,productId,size);
        console.log('cart in controller ',cart);
        if(cart)
        {
            return res.status(200).json(cart);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

const deleteCart = async (req, res, next) => {
    const userId = req.user.id;

    try
    {
        const cart = await cartService.deleteCart(userId);
        console.log('cart in controller ',cart);
        if(cart)
        {
            return res.status(200).json(cart);
        }
    }
    catch(err)
    {
        return res.status(404).json({err:err.message});
    }
}

module.exports = {createCart,removeFromCart,getCartByUserId,deleteCart};