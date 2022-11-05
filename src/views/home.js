import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex } from '@chakra-ui/react'
function Home() {
    return (
        <Flex>
            <Text fontSize='50px'>
                Home
            </Text>
            <ConnectButton chainStatus={'none'}/>
        </Flex>
    );
    }
export default Home;