import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find().populate("user").exec();

    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get aritcles"
    });
  }
};

export const getOne = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await PostModel.findOne({ _id: postId }).populate("user").exec();

    if (!post) {
      return res.status(404).json({
        message: "Article is not found"
      });
    }

    post.viewsCount += 1; // Збільшення лічильника переглядів
    await post.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get article"
    });
  }
};

export const remove = async (req, res) => {
  try {
    const postId = req.params.id;

    const deletedPost = await PostModel.findOneAndDelete({ _id: postId });

    if (!deletedPost) {
      return res.status(404).json({
        message: 'Article is not found',
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to delete an article',
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      user: req.userId
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to create an aritcle"
    });
  }
};

export const update = async (req, res) => {
    try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        user: req.userId,
        tags: req.body.tags,
      },
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Failed to update an article',
    });
  }
};
