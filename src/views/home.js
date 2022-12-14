import { Text, VStack, Heading } from '@chakra-ui/react'
import {useAccount} from 'wagmi';
import { useEnsName } from 'wagmi'
import {ConnectButton} from '@rainbow-me/rainbowkit';
import HomePost from './components/HomePost';
import { useContractRead, useProvider } from 'wagmi'
import ABI from '../Fundraiser.json'
function Home() {
    const {isConnected, address} = useAccount();
    const ensName = useEnsName({
        address: address,
        chainId: 1,
    })

    const { data, isSuccess, isLoading, error} = useContractRead({
        address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
        abi: ABI.abi,
        functionName: "getAllPosts"
    })
    let posts = data ? data : []
    let reverse = [];
    for (let i = posts.length - 1; i >= 0; i--) {
        reverse.push(posts[i]);
    }
    console.log(reverse)
    posts = reverse
    return (
        <VStack
            alignItems = "center"
            width = "90%"
            overflowY={"scroll"}
            spacing = {30}
            pb='10rem'>
            {isConnected ? (
                <Heading as='h1'>
                    Welcome Back {ensName.data ? ensName.data : address.split('').slice(0, 6).join('') + '...'}!
                </Heading>
            ) : (
                <VStack
                    spacing = {-40}>
                    <Text
                    fontSize = "50px"
                    fontWeight = "bold">
                        A social media to support each other.
                    </Text>
                    <Text
                    fontSize = "15px"
                    width = "600px"
                    paddingBottom = "20px">
                        FundIt is taking the middleman out of donations. Support individuals directly while getting rewarded for sharing posts with your circles. 
                    </Text>
                    <ConnectButton chainStatus={'none'}
                    showBalance = {false}/>
                </VStack>
            )}
            {posts.map((post, index) => (
                <HomePost
                    key = {index}
                    post = {post}
                    index = {index}
                />
            ))}
        </VStack>
    );
    }
export default Home;