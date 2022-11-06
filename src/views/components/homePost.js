import { Text, Flex, Image, Input, Button, InputLeftAddon, } from '@chakra-ui/react'
import {useState } from 'react';
import { useEnsName } from 'wagmi'
import { useEnsAvatar } from 'wagmi'
import shareIcon from './share.svg';

function HomePost(props) {
    const [donationAmount, setDonationAmount] = useState(0);
    const ensName = useEnsName({
        address: "0x7B80F95ce3e2BBC9fdF2e1A6B989Db80B7439346",
        chainId: 1,
    })
    const ensAvatar = useEnsAvatar({
        address: "0x7B80F95ce3e2BBC9fdF2e1A6B989Db80B7439346",
        chainId: 1,
    })
    return (
        <Flex
            border = "solid"
            borderRadius={"25"}
            direction={'column'}
            justifyContent = 'space-around'
            padding={20}
            spacing = {10}
            bg='white'>
            
            <Flex
                align={'center'}
                justify = {'left'}
                marginBottom = {'10'}>
                <Image
                    borderRadius="full"
                    boxSize="25px"
                    src={ensAvatar.data}
                    fallbackSrc="https://464911102-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/collections%2F2TjMAeHSzwlQgcOdL48E%2Ficon%2FKWP0gk2C6bdRPliWIA6o%2Fens%20transparent%20background.png?alt=media&token=bd28b063-5a75-4971-890c-97becea09076"
                />
                <Text
                paddingLeft={'5px'}
                fontSize = "sm"
                sx={{
                    textAlign:'center',
                }}
                >
                    {ensName.data}
                </Text>
            </Flex>
            <Image 
                src=""
                width="600px"
                height="600px"
            />
            <Flex
                align={'center'}
                justify = {'left'}>
                <Text
                    fontSize = "sm"
                    fontWeight={'bold'}
                    marginRight = '4px'
                    >
                        1000
                </Text>
                <Image
                    src = {shareIcon}
                    height = "20px"
                    color='gray.900'>
                    
                </Image>
            </Flex>
            <Text
                marginTop={'-5px'}
                fontSize = "md"
                width = "600px"
                >
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            </Text>
            <Flex
                align={'center'}
                paddingTop = {'10px'}
                justify = {'right'}>
                <Input
                    type="number"
                    width = '15rem'
                    height = '30px'
                    placeholder='0.00062'
                    borderRadius = '50px'
                    borderWidth = '1px'
                    borderColor = 'black'
                    zIndex = {2}
                    borderStyle={'solid'}
                    pl='1rem'
                    onChange = {
                        (e) => {
                            setDonationAmount(e.target.value);
                        }
                    }>
                </Input>
                <Button
                    position = {'absolute'}
                    height = '35px'
                    width = '6rem'
                    borderRadius = '50px'
                    borderWidth = '1px'
                    borderColor = 'black'
                    backgroundColor = '#E6FC9C'
                    borderStyle={'solid'}
                    cursor = 'pointer'
                    zIndex={2}>
                        <Text
                            fontSize = "sm"
                            fontWeight={'bold'}
                            pr='0.5rem'
                            pl='2rem'
                            // marginRight = '4px'
                            >
                                ETH
                        </Text>
                        <Image
                            src = {shareIcon}
                            height = "20px" pr='2rem'>
                            
                        </Image>
                </Button>
            </Flex>
            <Text
                align = {'right'}
                fontSize = "0.75rem"
                color = "gray"
                >
                    Clicking on share donates to both the poster and other sharers. <u>Learn More.</u>
            </Text>
        </Flex>
    );
    }
export default HomePost;