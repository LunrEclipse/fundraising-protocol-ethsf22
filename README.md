# What is FundIt

FundIt is a multi-level facetted fundraising platform that incentivises user participation through sharing and early contribution rewards. The users of our platform can be divided into two main categories: donators and recipients. Recipients benefit from peer-to-peer transactions that allow them to directly receive funds quickly and then liquidate almost immediately. For donators, the platform provides them with a transparent way to ensure that their funds are actually reaching the individuals they are supposed to help. Compared to typical fundraising platforms such as GoFundMe which takes a portion of donations for profit, our platform redistributes these royalties to early donors as a reward for finding and funding the project in its earlier roots. 

Now you may be asking yourself how does the royalty distribution work. When a user donates an amount of money, their donations are remembered in a pool of all previous donations. When a new user donates money, the previous donors receive funds proportional to their share of the pool. This incentivises people to donate early to projects and people they think need it to post. Those who guess right may just get a return of some of their donation allowing them to donate more. We purposely designed our system to ensure that profit can not be made. We want to ensure that our users use our platform for the right reason, helping others, and not just to benefit themselves. 

<br/>
<br/>

# Why Blockchain

One of the biggest benefits of blockchain technology is peer-to-peer, secure transfer through the usage of smart contracts as well as transparency. This ensures that donors are able to confirm that their transactions did in fact go to the individual who they want to assit and not some middle man. In addition, the chain is secure and immutable. This prevents censorship in cases where governments and other powers of authority may try and hide certain on going actions. 

<br/>
<br/>

# Why we built it

We believe that current fundraising platforms, such as GoFundMe, could benefit through better efficiency and transparency that blockchain technology provides.

<br/>
<br/>

# How we built it

Our project was built using React and Node.js for Frontend as well as EVM smart contracts deployed on Polygon. We chose Polygon as a social media app such as GoFundMe relies on constant transactions. Because of this, a chain with higher tps and lower gas than mainnet was ideal. In addition, when dealing with donations, we hope that as much of the donation reached the recipient as possible, not hindered by high gas fees. Finally, we see Polygon as the next "big chain" with collaborations with large social media companies such as Instagram. As a result, the large majority of Instagram users (a target demographic) would be more willing and able to user an app on the same chain. For storing and playing the videos we used a combination of Web3Storage and Livepeer. We believe that IPFS integration is important in maintaining censorship-resistance and found that these two APIs were the most advanced in terms of uploading and displaying videos. We also utilize PUSH to build in house notifications to tell a user when they either received some revenue or got a donation. Finally, we integrated ENS has a quick way of verifying on-chain identity. 

<br/>
<br/>

# Integrations
<br/>

## Polygon
Smart Contract: https://mumbai.polygonscan.com/address/0x1B41dEE2166D87149d2c30D47ac15A4cfa57Ad83

Best Publlic Goods:

FundIt is fundamentally an app that aims to empower users to make a positive impact on the world by incentivizing users to donate to and expand support networks for those in need. FundIt uses a portion of donations that current centralized platforms (ie. GoFundMe) collects as fees and distributes it among those who have donated to reward supporters for their help. For those in need, FundIt allows them to directly collect donations while potentially exposing them to a larger network by incentivizing sharing. 

By using cryptocurrencies as donations and storing all data on chain, FundIt allows users to transcend the boundaries of governments and focus on supporting individuals. 


Best UX:

FundIt was designed with the goal to drive adoption by allowing users to quickly and easily gain value from the site. After landing on the site, users first see posts, showing stories of people that they could resonate with. Only after a user decides to contribute or create a post do they have to connect a wallet. This ensures that users understand the value of FundIt before having to invest a lot of time figuring out wallets. Additionally, FundIt's simple and intuitive UI only displays information that are relevant to users at each stage of the user journey to ensure that the user is not overwhelmed and that the spotlight is on the stories of the individuals, not the UI. 

## Livepeer
Livepeer's easy and intuitive API and SDKs allowed us to quickly pull videos from IPFS and elegantly display them to our frontend. This feature enabled us to build our posting features as well as our feed. 

## IPFS/Web3.Storage
Web3.Storage provided quick and easy API calls to add and pin videos to IPFS. 

## ENS
ENS provided a quick and easy way to integrate and verify on-chain identity which can help to establish altruistic individuals as well as those in need of help.

## Push
PUSH provided us with a notification API to allow us to notify individuals when donations occured or when they received returns on an early donation.
