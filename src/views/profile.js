import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex, VStack, Box, HStack, Heading } from '@chakra-ui/react'
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
    const returns = data ? data[0]?.toNumber() ?? 0 : 0
    const contributions = data ? data[1]?.toNumber() ?? 0 : 0
    const numberOfPosts = data ? data[2]?.toNumber() ?? 0 : 0

    return (
        <Flex
            width = "90%"
            overflowY={"scroll"}
            spacing = {30}
            direction = 'column'>
            <VStack
                justifyContent={'center'}
                zIndex = {2}
                pt='2rem'>
                    <Heading as='h1' fontSize='rem'>
                        Dashboard
                    </Heading>
                    <ConnectButton chainStatus={'none'}/>
            </VStack>
            <HStack
                justifyContent={'center'}
                w='100%'
                zIndex={2}
                borderRadius = {'25px'}
                float='center'
                pt='2rem'>
                <Flex height = {'6rem'}
                    width = {'11rem'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'left'
                    align = 'center'
                    bg='white'>
                        <Flex direction={'column'}
                        pl='1.5rem'
                        pb='1rem'>
                        <Text fontSize="2rem"
                        mb='-0.75rem'>
                            {numberOfPosts}
                        </Text>
                        <Text fontSize = "0.75rem"
                            color='gray'>
                            Posts 
                        </Text>
                        
                        </Flex>
                </Flex>
                <Flex height = {'6rem'}
                    width = {'11rem'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'left'
                    align = 'center'
                    bg='white'>
                        <Flex direction={'column'}
                        pl='1.5rem'
                        pb='1rem'>
                        <Text fontSize="2rem"
                        mb='-0.75rem'>
                            {contributions}
                        </Text>
                        <Text fontSize = "0.75rem"
                            color='gray'>
                            Contributions (ETH) 
                        </Text>
                        
                        </Flex>
                </Flex>
                <Flex height = {'6rem'}
                    width = {'11rem'}
                    border = {'solid'}
                    borderRadius = {'25px'}
                    justifyContent = 'left'
                    align = 'center'
                    bg='white'>
                        <Flex direction={'column'}
                        pl='1.5rem'
                        pb='1rem'>
                        <Text fontSize="2rem"
                        mb='-0.75rem'>
                            {returns}
                        </Text>
                        <Text fontSize = "0.75rem"
                            color='gray'>
                            Returns (ETH) 
                        </Text>
                        
                        </Flex>
                </Flex>
            
            </HStack>
            <VStack
            alignItems = "center"
            width = "100%"
            spacing = {30}
            pt='4rem'
            >
                <ProfilePost/>
                <ProfilePost/>
                <ProfilePost/>
            </VStack>
        </Flex>
    );

    }
export default Profile;