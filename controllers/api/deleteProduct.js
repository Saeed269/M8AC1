const client = require('../../db/mongodb-connection');

const deleteProduct = async (req, res) => {
    const { productID } = req.params;
    const { ObjectId } = require('mongodb');
    
    try {
        await client.connect();
        const db = client.db('products');
        const collection = db.collection('products');
        
        const result = await collection.deleteOne({ _id: new ObjectId(productID) });
        
        if (result.deletedCount === 0) {
            return res.status(404).json('Product not found');
        }
        
        res.json('Product deleted successfully');
    } catch (error) {
        res.status(500).json('Error deleting product');
    }
}

module.exports = deleteProduct;