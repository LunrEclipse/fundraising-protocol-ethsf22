// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract Fundraiser is ReentrancyGuard{
    using SafeMath for uint256;
    using Counters for Counters.Counter;

    Counters.Counter private _postsId;
    Post[] public posts;
    uint256 public royalty = 5;
    mapping(address => uint256) public contributions;
    mapping(address => uint256) public profit;

    struct Post {
        string ipfsLink;
        address payable author;
        uint256 timestamp;
        uint256 amount;
        uint256 id;
        uint256 fundraisedAmount;
        address payable[] backers;
    }

    constructor() {
    }

    function createPost(string memory _ipfsLink, uint256 _amount) public payable nonReentrant{
        require(_amount > 0, "You need to set a price greater than 0");
        _postsId.increment();
        uint256 newPostId = _postsId.current();
        Post memory newPost = Post(_ipfsLink, payable(msg.sender), block.timestamp, _amount, newPostId, 0, new address payable[](0));
        posts.push(newPost);
    }

    function sharePost(uint256 _id) public payable nonReentrant{
        require(_id > 0 && _id <= posts.length, "Post does not exist");
        Post storage post = posts[_id];
        require(msg.value >= post.amount, "You need to send more Ether");
        uint256 amountToAuthor = post.amount.mul(100 - royalty).div(100);
        post.author.transfer(amountToAuthor);
        post.fundraisedAmount = post.fundraisedAmount.add(amountToAuthor);
        uint256 amountToBackers = post.amount.mul(royalty).div(100);
        for (uint256 i = 0; i < post.backers.length; i++) {
            post.backers[i].transfer(amountToBackers.div(post.backers.length));
            profit[post.backers[i]] = profit[post.backers[i]].add(amountToBackers.div(post.backers.length));
        }
        post.backers.push(payable(msg.sender));
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
    }

    function getAllPosts() public view returns (Post[] memory) {
        return posts;
    }

    function getYourCreatedPosts () public view returns (Post[] memory) {
        Post[] memory yourPosts = new Post[](_postsId.current());
        uint256 counter = 0;
        for (uint256 i = 0; i < posts.length; i++) {
            if (posts[i].author == msg.sender) {
                yourPosts[counter] = posts[i];
                counter++;
            }
        }
        return yourPosts;
    }



}