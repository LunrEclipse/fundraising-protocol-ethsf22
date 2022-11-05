import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Text, Flex } from '@chakra-ui/react'
function Profile() {
    return (
        <Flex>
            <Text fontSize='50px'>
                Profile
            </Text>
            <ConnectButton chainStatus={'none'}/>
        </Flex>
    );
    }
export default Profile;