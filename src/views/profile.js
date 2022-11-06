import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex, VStack, Box, HStack } from '@chakra-ui/react'
import ProfilePost from './components/ProfilePost';
import { useContractReads, useProvider } from 'wagmi'

import ABI from '../Fundraiser.json'

function Profile() {
    const provider = useProvider()
    const { data, isSuccess, isLoading, error} = useContractReads({
        contracts: [
            {
                address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
                abi: ABI.abi,
                functionName: "getYourProfit"
            },
            {
                address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
                abi: ABI.abi,
                functionName: "getYourContributions"
            },
            {
                address: process.env.REACT_APP_FUNDRAISER_ADDRESS,
                abi: ABI.abi,
                functionName: "getNumberOfPosts"
            },
        ]
    })
    const returns = data[0]?.toNumber() ?? 0
    const contributions = data[1]?.toNumber() ?? 0
    const numberOfPosts = data[2]?.toNumber() ?? 0

    return (
        <Flex
            width = "90%"
            overflowY={"scroll"}
            spacing = {30}
            direction = 'column'>
            <HStack
                justifyContent={'space-between'}
                zIndex = {2}>
                <Text
                fontSize = "50px"
                fontWeight = "bold"
                align={'left'}>
                    Dashboard
                </Text>
                <ConnectButton chainStatus={'none'} />
            </HStack>
            <Flex
                marginTop={'-40px'}
                height={'5px'}
                backgroundColor = {'#000000'}
                marginBottom = {'30px'}>
            </Flex>
            <HStack
                justifyContent={'space-around'}>
                <Flex height = {'125px'}
                    width = {'400px'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'center'
                    align = 'center'>
                        <Text fontSize = "30px"
                            fontWeight = "bold">
                            Your Posts: {numberOfPosts}
                        </Text>
                </Flex>
                <Flex height = {'125px'}
                    width = {'400px'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'center'
                    align = 'center'>
                    <Text fontSize = "30px"
                    fontWeight = "bold">
                    Your Contributions: {contributions} ETH
                </Text>
                </Flex>
                <Flex height = {'125px'}
                    width = {'400px'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'center'
                    align = 'center'>
                    <Text fontSize = "30px"
                        fontWeight = "bold">
                        Your Returns: {returns} ETH
                    </Text>
                </Flex>
            </HStack>
            <HStack>
                <Text
                fontSize = "50px"
                fontWeight = "bold"
                align={'left'}>
                    Posts
                </Text>
            </HStack>
            <Flex
                marginTop={'-40px'}
                height={'5px'}
                backgroundColor = {'#000000'}
                marginBottom = {'30px'}>
            </Flex>
            <VStack
            alignItems = "center"
            width = "90%"
            spacing = {30}>
                <ProfilePost/>
                <ProfilePost/>
                <ProfilePost/>
            </VStack>
        </Flex>
    );
    }
export default Profile;