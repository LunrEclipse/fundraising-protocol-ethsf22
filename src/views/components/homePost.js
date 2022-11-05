import { Text, Flex } from '@chakra-ui/react'
function homePost(props) {
    return (
        <Flex>
            <Text fontSize='50px'>
                {props.post}
            </Text>
            <ConnectButton chainStatus={'none'}/>
        </Flex>
    );
    }
export default homePost;