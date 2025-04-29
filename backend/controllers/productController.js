import Product from "../models/productModel.js";

const getProducts = async (req, res, next) => {
  try {
    const total = await Product.countDocuments();
    const maxLimit = 12;
    const maxSkip = total === 0 ? 0 : total - 1;
    const limit = Number(req.query.limit) || maxLimit;
    const skip = Number(req.query.skip) || 0;
    const search = req.query.search || "";

    const products = await Product.find({
      name: { $regex: search, $options: "i" },
    })
      .limit(limit > maxLimit ? maxLimit : limit)
      .skip(skip > maxSkip ? maxSkip : skip < 0 ? 0 : skip);

    console.log("limit: " + limit,"search: " +search,"skip: " + skip);
    if(!products || products.length===0){
        res.statuscode=404;
        throw new Error("Product not found!")
    }
    res.status(200).json({products,total,maxLimit,maxSkip})
  } catch (err) {
    next(err);
  }
};

const getTopProducts=async(req,res,next)=>{
    try{
        const products = await Product.find({}).sort({rating:-1}).limit(4)
        if (!products) {
          res.statusCode = 404;
          throw new Error('Product not found!');
        }
        res.status(200).json(products);  
    }catch(err){
        next(err);
    }
}


const updateProduct = async (req, res, next) => {
    try {
      const { name, image, description, brand, category, price, countInStock } =
        req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        res.statusCode = 404;
        throw new Error('Product not found!');
      }
  
      // Save the current image path before updating
      const previousImage = product.image;
  
      product.name = name || product.name;
      product.image = image || product.image;
      product.description = description || product.description;
      product.brand = brand || product.brand;
      product.category = category || product.category;
      product.price = price || product.price;
      product.countInStock = countInStock || product.countInStock;
  
      const updatedProduct = await product.save();
  
      res.status(200).json({ message: 'Product updated', updatedProduct });
    } catch (error) {
      next(error);
    }
  };


  const deleteProduct = async (req, res, next) => {
    try {
      const { id: productId } = req.params;
      const product = await Product.findById(productId);
  
      if (!product) {
        res.statusCode = 404;
        throw new Error('Product not found!');
      }
      await Product.deleteOne({ _id: product._id });
      res.status(200).json({ message: 'Product deleted' });
    } catch (error) {
      next(error);
    }
  };


  const createProductReview = async (req, res, next) => {
    try {
      const { id: productId } = req.params;
      const { rating, comment } = req.body;
  
      const product = await Product.findById(productId);
  
      if (!product) {
        res.statusCode = 404;
        throw new Error('Product not found!');
      }
  
      const alreadyReviewed = product.reviews.find(
        review => review.user._id.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.statusCode = 400;
        throw new Error('Product already reviewed');
      }
  
      const review = {
        user: req.user,
        name: req.user.name,
        rating: Number(rating),
        comment
      };
  
      product.reviews = [...product.reviews, review];
  
      product.rating =
        product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length;
      product.numReviews = product.reviews.length;
  
      await product.save();
  
      res.status(201).json({ message: 'Review added' });
    } catch (error) {
      next(error);
    }
  };



  const createProduct=async(req,res,next)=>{
    try{
        const {name,image,description,brand,category,price,countInStock}=req.body;
        const product=new Product({
            user:req.user._id,
            name,
            image,
            description,
            brand,
            price,
            countInStock
        })

        const newProduct=await product.save();
        res.status(200).json({message:"Product created",product:createProduct})
    }catch(err){
        next(err)
    }
  }


  const getProduct=async(req,res,next)=>{
    try{
        const {id:productId}=req.params;
        const product=await Product.findById(productId);

        if(!product){
            res.statusCode=404;
            throw new Error("Product not Found")
        }
        res.status(200).json(product)
    }catch(err){
        next(err)
    }
  }


export {getProducts,getTopProducts,updateProduct,deleteProduct,createProductReview,createProduct,getProduct}