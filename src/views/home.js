import { Text, VStack } from '@chakra-ui/react'
import {useAccount} from 'wagmi';
import { useEnsName } from 'wagmi'
import {ConnectButton} from '@rainbow-me/rainbowkit';
import HomePost from './components/HomePost';
function Home() {
    const {isConnected, address} = useAccount();
    const ensName = useEnsName({
        address: address,
        chainId: 1,
    })
    return (
        <VStack
            alignItems = "center"
            width = "90%"
            overflowY={"scroll"}
            spacing = {30}>
            {isConnected ? (
                <Text
                fontSize = "50px"
                fontWeight = "bold">
                    Welcome Back {ensName.data}!
                </Text>
            ) : (
                <VStack
                    spacing = {-40}>
                    <Text
                    fontSize = "50px"
                    fontWeight = "bold">
                        A new way to make a difference.
                    </Text>
                    <Text
                    fontSize = "15px"
                    width = "600px"
                    paddingBottom = "20px">
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </Text>
                    <ConnectButton chainStatus={'none'}
                    showBalance = {false}/>
                </VStack>
            )}
            <HomePost/>
            <HomePost/>
            <HomePost/>
        </VStack>
    );
    }
export default Home;