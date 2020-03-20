class PostController {
  /**
   * @route private /api/posts
   * @method POST
   * @param req
   * @param res
   * @description Create new post
   */
  getAllPosts (req, res) {
    res.status(200).json({ 'data': 'done' });
  }
}
module.exports = PostController;
