const reviewsController = {};

import reviewsModel from "../models/reviews.js";

//SELECT
reviewsController.getReviews = async (req, res) => {
  try {
    const reviews = await reviewsModel.find();
    return res.status(200).json(reviews);
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//INSERT
reviewsController.insertReviews = async (req, res) => {
  try {
    let { idEmployee, idPizza, rating, comment } = req.body;

    //VALIDACIONES
    //Sanitizar
    comment = comment?.trim();

    //campos requeridos
    if (!idEmployee || !idPizza || !rating) {
      return res.status(400).json({ message: "Field required" });
    }

    //Longitud de caracteres
    if (comment.length < 3 || comment.length > 200) {
      return res
        .status(400)
        .json({ message: "Comment must be between 3 and 200 characters" });
    }

    //Validacion de rating
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({
          message: "Invalid rating. Please insert a number between 1 and 5",
        });
    }

    const newReview = new reviewsModel({
      idEmployee,
      idPizza,
      rating,
      comment,
    });

    await newReview.save();
    return res.status(201).json({ message: "Review created successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//DELETE
reviewsController.deleteReview = async (req, res) => {
  try {
    const review = await reviewsModel.findByIdAndDelete(req.params.id);
    if (!deleteReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//UPDATE
reviewsController.updateReview = async (req, res) => {
  try {
    const reviewUpdated = await reviewsModel.findByIdAndUpdate(
      req.params.id,
      { idEmployee, idPizza, rating, comment },
      { new: true },
    );
    if (!updateReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    return res.status(200).json({ message: "Review updated successfully" });
  } catch (error) {
    console.log("error" + error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default reviewsController;
