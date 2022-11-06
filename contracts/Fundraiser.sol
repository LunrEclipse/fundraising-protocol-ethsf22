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
    uint256 public royalty = 29;
    mapping(address => uint256) public contributions;
    mapping(address => uint256) public profit;
    mapping(uint256 => mapping(address => uint256)) public postContributions;
    mapping(uint256 => mapping(address => uint256)) public postEarnings;
    mapping(address => uint256) public numberOfPosts;

    struct Post {
        string ipfsLink;
        address payable author;
        uint256 timestamp;
        uint256 total;
        uint256 amountReceived;
        uint256 id;
        address payable[] backers;
    }

    constructor() {
    }

    function createPost(string memory _ipfsLink) public payable nonReentrant{
        uint256 newPostId = _postsId.current();
        Post memory newPost = Post(_ipfsLink, payable(msg.sender), block.timestamp, 0, 0, newPostId, new address payable[](0));
        posts.push(newPost);
        numberOfPosts[msg.sender] = numberOfPosts[msg.sender].add(1);
         _postsId.increment();
    }

    function sharePost(uint256 _id) public payable nonReentrant{
        require(_id >= 0 && _id < posts.length, "Post does not exist");
        Post storage post = posts[_id];
        require(msg.value > 0, "You need to send some Eth");
        uint256 amountToAuthor = msg.value.mul(1000 - royalty).div(1000);
        post.amountReceived = post.amountReceived.add(amountToAuthor);
        post.author.transfer(amountToAuthor);
        post.total = post.total.add(amountToAuthor);

        uint256 amountToBackers = post.total.mul(royalty).div(1000);
        for (uint256 i = 0; i < post.backers.length; i++) {
            uint256 amountToTransfer = amountToBackers.mul(postContributions[_id][post.backers[i]]).div(post.total);
            amountToBackers.sub(amountToTransfer);
            postEarnings[_id][post.backers[i]] = postEarnings[_id][post.backers[i]].add(amountToTransfer);
            post.backers[i].transfer(amountToTransfer);
        }
        post.backers.push(payable(msg.sender));
        contributions[msg.sender] = contributions[msg.sender].add(msg.value);
        postContributions[_id][msg.sender] = postContributions[_id][msg.sender].add(msg.value);
        post.author.transfer(amountToBackers);
        post.amountReceived = post.amountReceived.add(amountToBackers);
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

    function getYourContributions(address _address) public view returns(uint256) {
        return contributions[_address];
    }

    function getYourProfit(address _address) public view returns(uint256) {
        return profit[_address];
    }

    function getYourEarnings(uint256 _id) public view returns (uint256) {
        return postEarnings[_id][msg.sender];
    }

    function getNumberOfPosts(address _address) public view returns (uint256) {
        return numberOfPosts[_address];
    }

}