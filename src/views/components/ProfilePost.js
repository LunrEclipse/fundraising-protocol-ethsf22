import { Text, Flex, Image, Input, Button} from '@chakra-ui/react'
import shareIcon from './shareicon.png';

function ProfilePost(props) {
    return (
        <Flex
            border = "solid"
            borderRadius={"25"}
            direction={'column'}
            justifyContent = 'space-around'
            padding={20}
            spacing = {10}>
            <Image 
                src=""
                width="600px"
                height="600px"
            />
            <Flex
                align={'center'}
                justify = {'left'}>
                <Text
                    fontSize = "10px"
                    fontWeight={'bold'}
                    marginRight = '4px'
                    >
                        1000
                </Text>
                <Image
                    src = {shareIcon}
                    height = "10px">
                </Image>
            </Flex>
            <Text
                marginTop={'-5px'}
                fontSize = "10px"
                width = "600px"
                >
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            </Text>
        </Flex>
    );
    }
export default ProfilePost;