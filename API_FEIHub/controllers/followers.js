const {response} = require('express');
const followersDAO = require('../dao/FollowersDAO');
const { use } = require('../routes/followers');
/**
 * @swagger
 * /follows:
 *  post:
 *    summary: add new folow
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      follower:
 *        type: String
 *        description: username to follower
 *      following:
 *        type: String
 *        description: username to following
 *    responses:
 *      200:
 *        description: create new follow
 *      500:
 *        description: error server
 */
const addNewFollowPost = async (req, res = response) => {
    const { follower, following } = req.body;
    const followers = { follower, following };
    try {
      const newFollow = await followersDAO.addNewFollow(followers);
      res.status(201).json(newFollow);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.toString() });
    }
};
/**
 * @swagger
 * /follows/followers/:username:
 *  get:
 *    summary: get followers to user
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: username to following
 *    responses:
 *      200:
 *        description: get followers
 *      500:
 *        description: error server
 */
const listFollowers = async (req, res = response) => {
    const username = req.params.username;
    try {
        const followers = await followersDAO.listUserFollowers(username);
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "We couldn't get your followers, try again later.",
        error: error.toString(),
        });
    }
};
/**
 * @swagger
 * /follows/following/:username:
 *  get:
 *    summary: get followers to user
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: username to follower
 *    responses:
 *      200:
 *        description: get following
 *      500:
 *        description: error server
 */
const listFollowing = async (req, res = response) => {
    const username = req.params.username;
    try {
        const followers = await followersDAO.listUserFollowing(username);
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "We couldn't get who you follow, try again later.",
        error: error.toString(),
        });
    }
};
/**
 * @swagger
 * /follows/followingUsers/:username:
 *  get:
 *    summary: get following to user
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: username to follower
 *    responses:
 *      200:
 *        description: get complete user following
 *      500:
 *        description: error server
 */
const listFollowingUsers = async (req, res = response) => {
    const username = req.params.username;
    try {
        const followers = await followersDAO.listUserFollowingComplete(username);
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "We couldn't get who you follow, try again later.",
        error: error.toString(),
        });
    }
}
/**
 * @swagger
 * /follows/followersUsers/:username:
 *  get:
 *    summary: get followers to user
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      username:
 *        type: String
 *        description: username to following
 *    responses:
 *      200:
 *        description: get complete user followers
 *      500:
 *        description: error server
 */
const listFollowerUsers = async (req, res = response) => {
    const username = req.params.username;
    try {
        const followers = await followersDAO.listUserFollowerComplete(username);
        res.status(200).json(followers);
    } catch (error) {
        console.error(error);
        res.status(500).json({
        message: "We couldn't get who you follow, try again later.",
        error: error.toString(),
        });
    }
}
/**
 * @swagger
 * /follows/follower/:following:
 *  delete:
 *    summary: get followers to user
 *    tags : [Followers]
 *    requestParameters:
 *      required.true
 *    content:
 *      following:
 *        type: String
 *        description: username to following
 *    responses:
 *      200:
 *        description: delet follow
 *      500:
 *        description: error server
 */
const deleteFollow = async (req, res = response) => {
    const { follower, following } = req.params;
    try {
        await followersDAO.deleteFollow(follower, following);
        res
        .status(200)
        .json({ message: `You have unfollowed ${following}` });
    } catch (error) {
        console.error(error);
        res
        .status(500)
        .json({ message: `Failed to unfollow ${following}`, error });
    }
};
module.exports = {
    addNewFollowPost,
    listFollowers,
    listFollowing,
    listFollowingUsers,
    listFollowerUsers,
    deleteFollow
};
