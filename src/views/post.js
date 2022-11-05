import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex } from '@chakra-ui/react'
function Post() {
    return (
        <Flex>
            <Text fontSize='50px'>
                Post
            </Text>
            <ConnectButton />
        </Flex>
    );
    }
export default Post;