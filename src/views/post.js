import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex } from '@chakra-ui/react'
function Post() {
    return (
        <Flex>
            <Text fontSize='50px'>
                Posts
            </Text>
            <ConnectButton />
        </Flex>
    );
    }
export default Post;