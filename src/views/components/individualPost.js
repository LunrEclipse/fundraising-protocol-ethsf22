import { Text, Flex } from '@chakra-ui/react'
function individualPost(props) {
    return (
        <Flex>
            <Text fontSize='50px'>
                {props.post}
            </Text>
            <ConnectButton chainStatus={'none'}/>
        </Flex>
    );
    }
export default individualPost;