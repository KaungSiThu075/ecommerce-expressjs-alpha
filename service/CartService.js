const Cart = require('../model/Cart');
const Product = require('../model/Product');

const getCartByUserId = async (userId) => {
    const cartByUserId = await Cart.findOne({userId});
    console.log('cart by user id in service ',cartByUserId);

    if(!cartByUserId)
    {
        return {cart:[]};
    }
    else
    {
        const populatedCart = await cartByUserId.populate('cart.product','name image');
        //return cartByUserId;
        return populatedCart;
    }
}

const createCart = async (userId,productId,size) => {
    const cart = await Cart.findOne({userId});
    console.log('cart in service ',cart)
    const productById = await Product.findById(productId);
    console.log('product in service ',productById);

    if(!cart)
    {
        const newCart = new Cart({
            userId,
            cart:[
                {
                    product:productId,
                    size,
                    price:productById.price,
                    quantity:1,
                    totalPrice:productById.price
                }
            ],
            totalPriceInCart:productById.price,
            totalQuantityInCart:1
        })
        const savedCart = await newCart.save();
        console.log('saved cart ',savedCart);
        const populatedCart = await savedCart.populate('cart.product', 'name image')
        return savedCart;
    }
    else
    {
        const itemIndex = cart.cart.findIndex(
            (item) => item.product.toString() === productId && item.size === size
        );
        console.log("item index in service ", itemIndex);

        const alreadyProduct = cart.cart.find(p=>p.product.toString() === productId && p.size === size);
        console.log('already product in service ', alreadyProduct);
        if(itemIndex >= 0)
        {
            cart.cart[itemIndex].quantity += 1;
            cart.cart[itemIndex].totalPrice += productById.price;
            cart.totalPriceInCart += productById.price;
            cart.totalQuantityInCart += 1;

            const savedCart = await cart.save();
            console.log('saved cart ',savedCart);
            const populatedCart = await savedCart.populate('cart.product', 'name image')
            //return  savedCart;
            return populatedCart;
        }
        else
        {
            cart.cart.push({
                product:productId,
                size,
                price:productById.price,
                quantity:1,
                totalPrice:productById.price
            });
            cart.totalPriceInCart += productById.price;
            cart.totalQuantityInCart += 1;
            console.log('total price in cart ',cart.totalPriceInCart)
            const savedCart = await cart.save();
            console.log('saved cart ',savedCart);
            const populatedCart = await savedCart.populate('cart.product', 'name image');
            //return  savedCart;
            return populatedCart;
        }
    }

    // const createdCart = await Cart.updateOne(
    //     {userId},
    //     {$addToSet:{cart:{product:productId,quantity:1,totalAmount:115}}},
    //     {upsert: true}
    // );
    // console.log('created cart ',createdCart);
    //
    // if(createdCart)
    // {
    //     const cartList = await Cart.findOne({userId});
    //     console.log('cart list ',cartList);
    //     return cartList;
    // }
};

const removeFromCart = async (userId,productId,size) => {
    const productById = await Product.findById(productId);
    console.log('product by id in service ',productById);

    const wholeCart = await Cart.findOne({userId});
    console.log('whole cart in service ',wholeCart);

    if(!wholeCart)
    {
        throw new Error(`can't find cart`)
    }
    else
    {
        const itemIndex = wholeCart.cart.findIndex(p=>p.product.toString() === productId && p.size === size);
        console.log('item index in service ',itemIndex);

        if(itemIndex >= 0)
        {
            const item = wholeCart.cart[itemIndex];
            console.log('item in service ',item);

            if(item.quantity > 1)
            {
                item.quantity -= 1;
                item.totalPrice -= productById.price;
            }
            else
            {
                wholeCart.cart.splice(itemIndex, 1);
            }
        }
        wholeCart.totalPriceInCart = wholeCart.cart.reduce((total,currentItem)=>{
            return total + (currentItem.price * currentItem.quantity);
        },0);
        wholeCart.totalQuantityInCart -= 1;

        const updatedCart = await wholeCart.save();
        console.log('updatedCart in service ',updatedCart);

        const populatedCart = await updatedCart.populate('cart.product', 'name image');
        //return updatedCart;
        return populatedCart;
    }
}

const deleteCart = async (userId) => {
    const cartByUserId = await Cart.findOne({userId});
    if(cartByUserId)
    {
        // const updatedCart = await
        //     Cart.findOneAndUpdate(
        //         {userId},
        //         {cart:[],totalAmountInCart: 0, totalPriceInCart: 0 },
        //         {new:true});
        const updatedCart = await Cart.findOneAndDelete({userId});
        console.log('updated cart in service ',updatedCart);
        return updatedCart;
    }
    else
    {
        throw new Error(`can't find cart`);
    }
}

module.exports = {createCart,removeFromCart,getCartByUserId,deleteCart};