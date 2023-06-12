const Product = require('../models/product-model.js');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    console.log(categories)
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

// const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category, startDate, endDate } = req.query;
//     const products = await Product.aggregate([
//       {
//         $match: {
//           category: category
//         }
//       },
//       {
//         $lookup: {
//           from: 'bookings',
//           localField: '_id',
//           foreignField: 'productId',
//           as: 'bookings'
//         }
//       },
//       {
//         $match: {
//           $or: [
//             { isBooked: false },
//             {
//               isBooked: true,
//               'bookings.startDate': { $not: { $lte: startDate } },
//               'bookings.endDate': { $not: { $gte: endDate } }
//             }
//           ]
//         }
//       }
//     ]);
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// };

// const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category, startDate, endDate } = req.query;
//     const products = await Product.aggregate([
//       {
//         $match: {
//           category: category
//         }
//       },
//       {
//         $lookup: {
//           from: 'bookings',
//           localField: '_id',
//           foreignField: 'productId',
//           as: 'bookings'
//         }
//       },
//       {
//         $match: {
//           $or: [
//             { isBooked: false },
//             {
//               // $or: [
//               //   { 'bookings.startDate': { $gte: endDate } },
//               //   { 'bookings.endDate': { $lte: startDate } }
//               // ]
//               isBooked: true,
//               $or: [
//                 { bookings: { $size: 0 } },
//                 {
//                   bookings: {
//                     $not: {
//                       $elemMatch: {
//                         startDate: { $gte: startDate },
//                         endDate: { $lte: endDate }
//                       }
//                     }
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     ]);
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// };

// const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category, startDate, endDate } = req.query;
//     const products = await Product.aggregate([
//       {
//         $match: {
//           category: category
//         }
//       },
//       {
//         $lookup: {
//           from: 'bookings',
//           localField: '_id',
//           foreignField: 'productId',
//           as: 'bookings'
//         }
//       },
//       {
//         $match: {
//           $or: [
//             { isBooked: false },
//             {
//               isBooked: true,
//               bookings: {
//                 $not: {
//                   $elemMatch: {
//                     $or: {
//                       $and: [
//                         { startDate: { $lte: startDate } },
//                         { endDate: { $lte: endDate } }
//                       ],
//                       $and : [
//                         { startDate: { $gte: startDate}},
//                         { endDate: { $gte: endDate}}
//                       ]
//                     }
//                   }
//                 }
//               }
//             }
//           ]
//         }
//       }
//     ]);
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// };

const getProductsByCategory = async (req, res, next) => {
  try {
    const { category, startDate, endDate } = req.query;
    const products = await Product.aggregate([
      {
        $match: {
          category: category
        }
      },
      {
        $lookup: {
          from: 'bookings',
          localField: '_id',
          foreignField: 'productId',
          as: 'bookings'
        }
      },
      {
        $match: {
          $or: [
            { isBooked: false },
            {
              // isBooked: true,
              bookings: {
                // $not: {
                  $elemMatch: {
                    $or: [
                      {
                        $and: [
                          { startDate: { $lt: startDate } },
                          { endDate: { $lt: startDate } }
                        ]
                      },
                      {
                        $and: [
                          { startDate: { $gt: endDate } },
                          { endDate: { $gt: endDate } }
                        ]
                      }
                    ]
                  }
                // }
              }
            }
          ]
        }
      }
    ]);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// const getProductsByCategory = async (req, res, next) => {
//   try {
//     const { category, startDate, endDate } = req.query;
//     const products = await Product.aggregate([
//       {
//         $match: {
//           category: category
//         }
//       },
//       {
//         $lookup: {
//           from: 'bookings',
//           localField: '_id',
//           foreignField: 'productId',
//           as: 'bookings'
//         }
//       },
//       {
//         $match: {
//           $or: [
//             { isBooked: false },
//             {
//               isBooked: true,
//               $or: [
//                 { bookings: { $size: 0 } },
//                 {
//                   bookings: {
//                     $not: {
//                       $elemMatch: {
//                         startDate: { $gte: startDate },
//                         endDate: { $lte: endDate }
//                       }
//                     }
//                   }
//                 }
//               ]
//             }
//           ]
//         }
//       }
//     ]);
//     res.status(200).json(products);
//   } catch (error) {
//     next(error);
//   }
// };

const createProduct = async (req, res, next) => {
  try {
    // const {name, image, cost, isBooked, bookedDates} = req.body;
    console.log(req.body);
    const products = await Product.create(req.body);
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getCategories,
  createProduct,
  getProductsByCategory
};
